const express = require("express");
const router = express.Router();
const db = require("../db");

const tipo = require("../middleware/tipo")
const verificarAdministrador = require("../middleware/verificarAdministrador");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM diretor");
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há diretores cadastrados." });
        }
        return res.status(200).json({ diretores: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

//Pegar o id do diretor pelo nome. Usado na pesquisa da navbar
router.get("/nome/:nome", async (req, res) => {
    try {
        const r = await db.query("SELECT id FROM diretor WHERE nome=$1", [req.params.nome])
        if (r.rowCount == 0) {
            return res.status(404).json({ msg: "Não existe diretor com esse nome" })
        }
        return res.json({ diretor: r.rows[0] })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.get("/:id", tipo, async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM diretor WHERE id=$1", [req.params.id])
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há diretor com esse id cadastrado." });
        }
        return res.json({ diretor: r.rows[0] })

    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.get("/:id/dirige", tipo, async (req, res) => {
    try {
        const r1 = await db.query("SELECT * FROM diretor WHERE id=$1",[req.params.id]);

        if (!r1.rowCount) {
            return res.status(404).json({msg: "Não há diretor com esse id cadastrado."});
        }

        const r = await db.query("SELECT titulo, 'filme' AS tipo FROM filme WHERE diretor = $1 UNION ALL SELECT titulo, 'serie' AS tipo FROM serie WHERE diretor = $1", [req.params.id]);

        if (!r.rowCount) {
            return res.status(200).json({msg: "Diretor iniciante, nunca dirigiu nenhuma produção.", filmes: [], series: [] });
        }

        const prod = [[], []];

        for (let p of r.rows) {
            if (p.tipo === "filme") {
                prod[0].push(p.titulo);
            }

            if (p.tipo === "serie") {
                prod[1].push(p.titulo);
            }
        }

        return res.status(200).json({ filmes: prod[0], series: prod[1] });

    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.post("/", verificarAdministrador, upload.single("arquivo"), async (req, res) => {
    try {
        const { nome, nacionalidade, data_nascimento, biografia, qtde_premios } = req.body;
        if (!nome) { return res.status(400).json({msg:"Nome não informado!"});}
        if (!nacionalidade){return res.status(400).json({msg:"Nacionalidade não informado!"});}
        if (!data_nascimento){return res.status(400).json({msg:"Data de nascimento não informada!"});}

        if (qtde_premios < 0) {
            return res.status(400).json({msg:"A quantidade de prêmios deve ser um número inteiro."})
        }

        var r2;
        if (!req.file) {
            r2 = await db.query("INSERT INTO diretor(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, null]);
        } else {
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
            r2 = await db.query("INSERT INTO diretor(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia)VALUES ($1, $2, $3, $4, $5, $6)RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, arquivo.arquivo.id]);
        }

        if (!r2.rowCount) {
            return res.status(500).json({msg: "Erro ao cadastrar o diretor."});
        }

        return res.json({diretor: r2.rows[0]});
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

//PUT
router.put("/:id", tipo, verificarAdministrador, upload.single("arquivo"), async (req, res) => {
    try {
        const { biografia, qtde_premios } = req.body
        const id = req.params.id

        if (!biografia || !qtde_premios || !req.file) {
            return res.status(400).json({ msg: "O diretor deve ter pelo menos um atributo para ser alterado!" })
        }

        if (!isNaN(qtde_premios) && qtde_premios >= 0) {
            return res.status(400).json({ msg: "O quantidade de prêmios deve ser um número inteiro." })
        }


        const atual = await db.query("SELECT * FROM diretor WHERE id=$1", [req.params.id]);
        if (!atual.rowCount) {
            return res.status(404).json({ msg: "Diretor não inexistente."});
        }

        let r2 = await db.query("UPDATE diretor SET biografia = $1, qtde_premios = $2 WHERE id = $3", [biografia != undefined ? biografia : atual.rows[0].biografia, qtde_premios!=undefined? qtde_premios : atual.rows[0].qtde_premios, id])

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
            await db.query("UPDATE diretor SET fotografia=$1 WHERE id=$2",[arquivo.arquivo.id, id]);
        }

        r2 = await db.query("SELECT * FROM diretor WHERE id=$1", [req.params.id]);
        return res.json({diretor: r2.rows[0]})
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.delete("/:id", tipo, verificarAdministrador, async (req, res) => {
    try {
        const r = await db.query("SELECT fotografia FROM diretor WHERE id=$1", [req.params.id])
        if (r.rowCount == 0) {
            return res.status(400).json({ msg: "Diretor inexistente" })
        }

        await db.query("DELETE FROM diretor WHERE id=$1", [req.params.id])
        if (r.rows[0].fotografia != 1 && r.rows[0].fotografia != 2) {
            await fetch(`http://localhost:3000/arquivo/${r.rows[0].fotografia}`, { method: "DELETE" })
        }

        return res.json({ msg: "Diretor deletado com sucesso" })
    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})

module.exports = router;