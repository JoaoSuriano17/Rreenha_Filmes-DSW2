const express = require("express");
const router = express.Router();
const db = require("../db");

const tipo = require("../middleware/tipo")
const verificarAdministrador = require("../middleware/verificarAdministrador");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM ator");
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há atores cadastrados." });
        }
        return res.status(200).json({ atores: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

//Pegar o id do ator pelo nome. Usado na pesquisa da navbar
router.get("/nome/:nome", async (req, res) => {
    try {
        const r = await db.query("SELECT id FROM ator WHERE nome=$1", [req.params.nome])
        if (r.rowCount == 0) {
            return res.status(404).json({ msg: "Não existe ator com esse nome" })
        }
        return res.json({ ator: r.rows[0] })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.get("/:id", tipo, async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM ator WHERE id=$1", [req.params.id])
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há ator com esse id cadastrado." });
        }
        return res.json({ ator: r.rows[0] })

    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.post("/", verificarAdministrador, upload.single("arquivo"), async (req, res) => {
    try {
        const { nome, nacionalidade, data_nascimento, biografia, qtde_premios } = req.body

        if (!nome) {
            return res.status(400).json({ msg: "O ator deve ter pelo menos um nome" })
        }

        var r2;
        if (!req.file) {
            r2 = await db.query("INSERT INTO ator(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, 1])
        } else {
            const formData = new FormData();
            formData.append("arquivo", new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

            const r = await fetch("http://localhost:3000/arquivo", { method: "POST", body: formData })
            if (!r.ok) {
                return res.status(500).json({ msg: "Erro ao salvar a imagem" });
            }

            const arquivo = await r.json();

            r2 = await db.query("INSERT INTO ator(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, arquivo.id])
        }

        if (!r2.rowCount) {
            return res.status(500).json({ msg: "Erro ao cadastrar o ator" });
        }

        return res.json({ ator: r2.rows[0] })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

//PUT

router.put("/:id", tipo, verificarAdministrador, upload.single("arquivo"), async (req, res) => {
    try {
        const { biografia, qtde_premios } = req.body;
        const id = req.params.id;

        if (!biografia && !qtde_premios && !req.file) {
            return res.status(400).json({msg: "O ator deve ter pelo menos um atributo para ser alterado!"});
        }

        let r2;
        if (biografia) {
            r2 = await db.query("UPDATE ator SET biografia = $1 WHERE id = $2 RETURNING *", [biografia, id]);
        }

        if (qtde_premios) {
            r2 = await db.query("UPDATE ator SET qtde_premios = $1 WHERE id = $2 RETURNING *", [qtde_premios, id]);
        }

        if (req.file) {
            const formData = new FormData();
            formData.append(
                "arquivo",
                new Blob([req.file.buffer], { type: req.file.mimetype }),
                req.file.originalname
            );

            const r = await fetch("http://localhost:3000/arquivo", {
                method: "POST",
                body: formData
            });

            if (!r.ok) {
                return res.status(500).json({msg: "Erro ao salvar a imagem."});
            }

            const arquivo = await r.json();
            r2 = await db.query("UPDATE ator SET fotografia = $1 WHERE id = $2 RETURNING *", [arquivo.arquivo.id, id]);
        }

        if (!r2) {
            r2 = await db.query("SELECT * FROM ator WHERE id = $1", [id]);
        }

        if (r2.rowCount == 0) {
            return res.status(404).json({msg: "Ator não encontrado."});
        }

        return res.status(200).json({msg: "Ator atualizado com sucesso!",ator: r2.rows[0]});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
});


router.delete("/:id", tipo, verificarAdministrador, tipo, async (req, res) => {
    try {
        const r = await db.query("SELECT fotografia FROM ator WHERE id=$1", [req.params.id])
        if (r.rowCount == 0) {
            return res.status(400).json({ msg: "Ator inexistente" })
        }

        await db.query("DELETE FROM ator WHERE id=$1", [req.params.id])
        if (r.rows[0].fotografia != 1 && r.rows[0].fotografia != 2) {
            await fetch(`http://localhost:3000/arquivo/${r.rows[0].fotografia}`, { method: "DELETE" })
        }

        return res.json({ msg: "Ator deletado com sucesso" })
    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})


router.post("/:id/filme/:filme", tipo, verificarAdministrador,  async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM ator WHERE id=$1", [req.params.id])
        if (r.rowCount == 0) {
            return res.status(400).json({ msg: "Ator inexistente." })
        }

        if (isNaN(req.params.serie)){
            return res.json({msg:"O id deve ser um número inteiro!"})
        }

        const r2 = await db.query("SELECT * FROM filme WHERE id=$1", [req.params.filme])
        if (r2.rowCount == 0) {
            return res.status(400).json({ msg: "Filme inexistente" })
        }

        const requisicao = await db.query("INSERT INTO filme_ator(id_filme, id_ator) VALUES ($1, $2)", [req.params.filme, req.params.id])
        if (!requisicao.rowCount){
            return res.status(400).json({msg: "Erro ao associar ator a um filme."})
        }

        return res.json({ msg: "Associação realizada com sucesso!" })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.delete("/:id/filme/:filme", tipo, verificarAdministrador,  async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM ator WHERE id=$1", [req.params.id])
        if (r.rowCount == 0) {
            return res.status(400).json({ msg: "Ator inexistente." })
        }

        if (isNaN(req.params.serie)){
            return res.json({msg:"O id deve ser um número inteiro!"})
        }

        const r2 = await db.query("SELECT * FROM filme WHERE id=$1", [req.params.filme])
        if (r2.rowCount == 0) {
            return res.status(400).json({ msg: "Filme inexistente" })
        }

        const requisicao = await db.query("DELETE FROM filme_ator WHERE id_filme=$1 AND id_ator=$2", [req.params.filme, req.params.id])
        if (!requisicao.rowCount){
            return res.status(400).json({msg: "Erro ao desassociar ator a um filme."})
        }

        return res.json({ msg: "Desassociação realizada com sucesso!" })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})


router.post("/:id/serie/:serie", tipo, verificarAdministrador,  async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM ator WHERE id=$1", [req.params.id])
        if (r.rowCount == 0) {
            return res.status(400).json({ msg: "Ator inexistente." })
        }

        if (isNaN(req.params.serie)){
            return res.json({msg:"O id deve ser um número inteiro!"})
        }

        const r2 = await db.query("SELECT * FROM serie WHERE id=$1", [req.params.serie])
        if (r2.rowCount == 0) {
            return res.status(400).json({ msg: "Série inexistente" })
        }

        const requisicao = await db.query("INSERT INTO filme_serie(id_serie, id_ator) VALUES ($1, $2)", [req.params.serie, req.params.id])
        if (!requisicao.rowCount){
            return res.status(400).json({msg: "Erro ao associar ator a uma série."})
        }

        return res.json({ msg: "Associação realizada com sucesso!" })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.delete("/:id/serie/:filme", tipo, verificarAdministrador,  async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM ator WHERE id=$1", [req.params.id])
        if (r.rowCount == 0) {
            return res.status(400).json({ msg: "Ator inexistente." })
        }

        if (isNaN(req.params.serie)){
            return res.json({msg:"O id deve ser um número inteiro!"})
        }

        const r2 = await db.query("SELECT * FROM serie WHERE id=$1", [req.params.serie])
        if (r2.rowCount == 0) {
            return res.status(400).json({ msg: "Série inexistente" })
        }

        const requisicao = await db.query("DELETE FROM filme_serie WHERE id_serie=$1 AND id_ator=$2", [req.params.serie, req.params.id])
        if (!requisicao.rowCount){
            return res.status(400).json({msg: "Erro ao desassociar ator a um filme."})
        }

        return res.json({ msg: "Desassociação realizada com sucesso!" })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

module.exports = router;