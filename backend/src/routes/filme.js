const express = require("express");
const router = express.Router();
const db = require("../db");

const tipo = require("../middleware/tipo")

const multer = require("multer");
const verificarAdministrador = require("../middleware/verificarAdministrador");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM filme");
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há filmes cadastrados." });
        }
        return res.status(200).json({ filmes: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

//Mostrar os filmes do mais premiados ao menos premiado
router.get("/premiado", async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM filme ORDER BY qtde_premios DESC");
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há filme cadastrado com esse nome." });
        }
        return res.status(200).json({ filmes: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

//Pegar o id do filme pelo titulo. Usado na pesquisa da navbar
router.get("/titulo/:titulo", async (req, res) => {
    try {
        const r = await db.query("SELECT id FROM filme WHERE titulo=$1", [req.params.titulo])
        if (r.rowCount == 0) {
            return res.status(404).json({ msg: "Não existe filme com esse título" })
        }
        return res.json({ filme: r.rows[0] })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.get("/:id", tipo, async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM filme WHERE id=$1", [req.params.id])
        if (r.rowCount == 0) {
            return res.status(404).json({ msg: "Não existe filme com esse id" })
        }
        return res.json({ filme: r.rows[0] })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

router.post("/", verificarAdministrador, upload.single("arquivo"), async (req, res) => {
    try {
        const { titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios } = req.body
        if (!titulo, !diretor, !sinopse, !faixa_etaria, !duracao) {
            return res.status(400).json({ msg: "O filme deve, no mínimo, ter título, diretor, sinopse, faixa etária e duração." })
        }

        if ((!isNaN(faixa_etaria) || faixa_etaria > 0) && (!isNaN(duracao) || duracao > 0)) {
            return res.status(400).json({ msg: "O faixa etária e duração devem ser números inteiros maiores que 0" })
        }

        const diretorExiste = await db.query("SELECT * FROM diretor WHERE id=$1", [diretor])
        if (!diretorExiste.rowCount) {
            return res.json({ msg: "Diretor inexistente." })
        }

        var r2;
        if (!req.file) {
            r2 = await db.query("INSERT INTO filme(titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, cartaz) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, 2])
        } else {
            const formData = new FormData();
            formData.append("arquivo", new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

            const r = await fetch("http://localhost:3000/arquivo", { method: "POST", body: formData })
            if (!r.ok) {
                return res.status(500).json({ msg: "Erro ao salvar a imagem" });
            }

            const arquivo = await r.json();

            r2 = await db.query("INSERT INTO filme(titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, cartaz) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, arquivo.id])
        }

        if (!r2.rowCount) {
            return res.status(500).json({ msg: "Erro ao cadastrar o filme" });
        }

        return res.json({ filme: r2.rows[0] })
    } catch (erro) {
        return res.status(500).json({ msg: erro.message })
    }
})

//PUT
router.put("/:id", tipo, verificarAdministrador, async (req, res) => {
    try {
        const { titulo, sinopse, faixa_etaria, duracao, qtde_premios } = req.body;

        const atual = await db.query("SELECT * FROM episodio WHERE id=$1", [req.params.id]);
        if (!atual.rowCount) {
            return res.status(404).json({ msg: "Filme inexistente." });
        }

        if (!titulo || !sinopse || !duracao || !faixa_etaria || !qtde_premios) {
            return res.status(404).json({ msg: "Algum parâmetro deve ser passado." });
        }

        // Verificando os atributos: 
        if (!isNaN(duracao) || duracao < 1) {
            return res.status(400).json({ msg: "A duração deve ser um número inteiro maior que 0." })
        }
        if (!isNaN(faixa_etaria) || faixa_etaria < 1) {
            return res.status(400).json({ msg: "A faixa etária deve ser um número inteiro igual ou maior que 1." })
        }
        if (!isNaN(qtde_premios) || qtde_premios < 1) {
            return res.status(400).json({ msg: "A faixa etária deve ser um número inteiro igual ou maior que 1." })
        }


        const r = await db.query("UPDATE filme SET titulo=$1, sinopse=$2, duracao=$3, faixa_etaria=$4, qtde_premios=$5 WHERE id=$6 RETURNING *", [titulo != undefined ? titulo : atual.rows[0].titulo, sinopse != undefined ? sinopse : atual.rows[0].sinopse, duracao != undefined ? duracao : atual.rows[0].sinopse, qtde_premios != undefined ? qtde_premios : atual.rows[0].qtde_premios, req.params.id]);
        if (!r.rowCount) {
            return res.status(500).json({ msg: "Erro ao alterar filme." });
        }

        return res.json({ filme: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.delete("/:id", tipo, verificarAdministrador, async (req, res) => {
    try {
        const r = await db.query("SELECT cartaz FROM filme WHERE id=$1", [req.params.id])
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Filme inexistente" })
        }

        await db.query("DELETE FROM filme WHERE id=$1", [req.params.id])
        if (r.rows[0].cartaz != 1 && r.rows[0].cartaz != 2) {
            await fetch(`http://localhost:3000/arquivo/${r.rows[0].cartaz}`, { method: "DELETE" })
        }

        return res.json({ msg: "Filme deletado com sucesso" })
    } catch (erro) {
        res.status(500).json({ msg: erro.message })
    }
})

module.exports = router;