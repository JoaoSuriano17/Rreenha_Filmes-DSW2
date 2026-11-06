
const express = require("express");
const router = express.Router();
const db = require("../db");

const tipo = require("../middleware/tipo");

router.get("/", async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM episodio");
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há episódios cadastrados." });
        }

        return res.status(200).json({ episodios: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.get("/serie/:id", async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM episodio WHERE serie_id=$1 ORDER BY temporada, id", [req.params.id]);
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Não há episódios cadastrados para essa série." });
        }

        return res.status(200).json({ episodios: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.get("/:id", tipo, async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM episodio WHERE id=$1", [req.params.id]);
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Não há episódio com esse id cadastrado." });
        }

        return res.json({ episodio: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const {titulo, sinopse, duracao, temporada, serie_id} = req.body;

        if (!titulo || !serie_id) {
            return res.status(400).json({ msg: "O episódio deve possuir pelo menos um título e uma série." });
        }

        const r = await db.query(
            `INSERT INTO episodio (titulo, sinopse, duracao, temporada, serie_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [titulo, sinopse, duracao, temporada, serie_id]
        );

        if (!r.rowCount) {
            return res.status(500).json({ msg: "Erro ao cadastrar o episódio." });
        }

        return res.json({ episodio: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.put("/:id", tipo, async (req, res) => {
    try {
        const {titulo, sinopse, duracao, temporada, serie_id} = req.body;

        const atual = await db.query("SELECT * FROM episodio WHERE id=$1", [req.params.id]);
        if (!atual.rowCount) {
            return res.status(404).json({ msg: "Episódio inexistente." });
        }

        const r = await db.query(
            `UPDATE episodio SET titulo=$1, sinopse=$2, duracao=$3, temporada=$4, serie_id=$5
            WHERE id=$6 RETURNING *`,
            [titulo, sinopse, duracao, temporada, serie_id, req.params.id]
        );

        return res.json({ episodio: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

router.delete("/:id", tipo, async (req, res) => {
    try {
        const r = await db.query("DELETE FROM episodio WHERE id=$1 RETURNING *", [req.params.id]);
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Episódio inexistente." });
        }

        return res.json({ msg: "Episódio deletado com sucesso." });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

module.exports = router;
