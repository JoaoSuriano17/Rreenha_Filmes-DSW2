const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage()});

const tipo = require("../middleware/tipo");
const verificarAdministrador = require("../middleware/verificarAdministrador")


router.get("/", async (req, res) => {
    try {
        const requisicao1 = await db.query("SELECT * FROM serie");
        if (!requisicao1.rowCount) {
            return res.status(400).json({msg: "Não há séries cadastradas."});
        }

        return res.status(200).json({series: requisicao1.rows});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
});

//Pegar o id da serie pelo titulo. Usado na pesquisa da navbar. Seria melhor usar um for?
router.get("/titulo/:titulo", async (req, res) => {
    try {
        const requisicao1 = await db.query("SELECT id FROM serie WHERE titulo=$1", [req.params.titulo])
        if (!requisicao1.rowCount) {
            return res.status(404).json({ msg: "Não existe série com esse título." })
        }
        return res.json({serie: requisicao1.rows[0]})
    } catch (erro) {
        return res.status(500).json({msg: erro.message})
    }
})

router.get("/:id", tipo, async (req, res) => {
    try {
        const requisicao1 = await db.query("SELECT * FROM serie WHERE id=$1", [req.params.id]);
        if (!requisicao1.rowCount) {
            return res.status(404).json({ msg: "Série inexistente."});
        }

        return res.json({serie: requisicao1.rows[0]});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
});

router.get("/:id/atores", tipo, async (req, res) => {
    try {
        const requisicao1 = await db.query("SELECT ator.* FROM serie_ator JOIN ator ON serie_ator.id_ator = ator.id WHERE id_serie=$1", [req.params.id]);
        if (!requisicao1.rowCount) {
            return res.status(400).json({msg:"Não há atores neste filme."});
        }
        return res.status(200).json({atores: requisicao1.rows});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
})

//Terminar o serie.js
router.post("/", verificarAdministrador, upload.single("arquivo"), async (req, res) => {
    try {
        const { titulo, diretor, sinopse, faixa_etaria, qtde_premios } = req.body;
        if (!titulo || !diretor) {
            return res.status(400).json({ msg: "A série deve possuir pelo menos um título e um diretor." });
        }

        if (faixa_etaria <= 0 || faixa_etaria>18) {
            return res.status(400).json({ msg: "A faixa etária deve ser um número inteiro igual ou maior que 0." })
        }
        if (qtde_premios < 0) {
            return res.status(400).json({ msg: "A quantidade de prêmios deve ser um número inteiro igual ou maior que 0." })
        }

        var r2;
        if (!req.file) {
            r2 = await db.query(`INSERT INTO serie (titulo, diretor, sinopse, faixa_etaria, qtde_premios, cartaz) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [titulo, diretor, sinopse, faixa_etaria, qtde_premios, 2]);
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
                return res.status(500).json({
                    msg: "Erro ao salvar o cartaz."
                });
            }

            const arquivo = await r.json();

            r2 = await db.query("INSERT INTO serie(titulo, diretor, sinopse, faixa_etaria, qtde_premios, cartaz) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [titulo, diretor, sinopse, faixa_etaria, qtde_premios, arquivo.id]);
        }
        if (!r2.rowCount) {
            return res.status(500).json({ msg: "Erro ao cadastrar a série." });
        }

        return res.json({ serie: r2.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

//Terminar o serie.js
router.put("/:id", tipo, verificarAdministrador, upload.single("arquivo"), async (req, res) => {
    try {
        const { titulo, diretor, sinopse, faixa_etaria, qtde_premios } = req.body;

        const atual = await db.query("SELECT * FROM serie WHERE id=$1", [req.params.id]);
        if (!atual.rowCount) {
            return res.status(404).json({ msg: "Série inexistente." });
        }

        if (!isNaN(faixa_etaria) || faixa_etaria < 1) {
            return res.status(400).json({ msg: "A faixa etária deve ser um número inteiro igual ou maior que 1." })
        }
        if (!isNaN(qtde_premios) || qtde_premios < 1) {
            return res.status(400).json({ msg: "A quantidade de prêmios deve ser um número inteiro igual ou maior que 1." })
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
                return res.status(500).json({ msg: "Erro ao salvar o novo cartaz!" });
            }
            const arquivo = await r.json();
            await db.query("UPDATE filme SET cartaz = $1 WHERE id = $2", [arquivo.arquivo.id, id]);
        }

        const resultado = await db.query("UPDATE serie SET titulo=$1, diretor=$2, sinopse=$3, faixa_etaria=$4, qtde_premios=$5 WHERE id =$6", [titulo!=undefined?titulo:atual.rows[0].titulo, diretor!=undefined?diretor:atual.rows[0].diretor, sinopse!=undefined?sinopse:atual.rows[0].sinopse, faixa_etaria!=undefined?titulo:atual.rows[0].faixa_etaria, qtde_premios!=undefined?qtde_premios:atual.rows[0].qtde_premios, req.params.id]);
        return res.json({ serie: resultado.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.delete("/:id", tipo, verificarAdministrador, async (req, res) => {
    try {
        const r = await db.query("SELECT cartaz FROM serie WHERE id=$1", [req.params.id]);
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Série inexistente." });
        }

        let r1 = await db.query("DELETE FROM serie WHERE id=$1", [req.params.id]);
        if(!r1.rowCount){
            return res.status(400).json({msg: "Erro ao deletar série."})
        }

        await fetch(`http://localhost:3000/arquivo/${r.rows[0].cartaz}`, { method: "DELETE" });
        return res.json({ msg: "Série deletada com sucesso." });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

module.exports = router;