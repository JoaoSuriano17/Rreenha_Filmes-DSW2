const express = require("express");
const router = express.Router();
const db = require("../db");

const tipo = require("../middleware/tipo");
const verificarAdministrador = require("../middleware/verificarAdministrador");

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

router.get("/:id/serie/:serie", tipo, async (req, res) => {
    try {
        //Verificando o parâmetro série da URL: 
        if (isNaN(req.params.serie)){
            return res.json({msg:"O id da série deve ser um número inteiro!"})
        }

        const r = await db.query("SELECT * FROM episodio WHERE id = $1 AND serie_id = $2", [req.params.id, req.params.serie]);
        if (!r.rowCount) {
            return res.status(404).json({msg:"Não há episódio com esse identificar nessa série."});
        }

        return res.status(200).json({episodios: r.rows});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
});

/*router.get("/serie/:serie", tipo, async (req, res) => {
    try {
        if (isNaN(req.params.serie)){
            return res.json({msg:"O id da série deve ser um número inteiro!"})
        }

        const r = await db.query("SELECT * FROM episodio WHERE serie_id=$1 ORDER BY temporada, id", [req.params.serie]);
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Não há episódios cadastrados nessa série." });
        }

        return res.status(200).json({ episodios: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});*/

/*router.get("/:id", tipo, async (req, res) => {
    try {
        const r = await db.query("SELECT * FROM episodio WHERE id=$1", [req.params.id]);
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Não há episódio com esse id cadastrado." });
        }

        return res.json({ episodio: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});*/

router.post("/", verificarAdministrador, async (req, res) => {
    try {
        const {titulo, sinopse, duracao, temporada, serie_id} = req.body;

        if (!titulo || !serie_id) {
            return res.status(400).json({ msg: "O episódio deve possuir pelo menos um título e uma série." });
        }

        // Verificando os atributos: 
        if(!isNaN(duracao) || duracao<1){
            return res.status(400).json({msg: "A duração deve ser um número inteiro maior que 0."})
        }
        if(!isNaN(temporada) || temporada<1){
            return res.status(400).json({msg: "A temporada deve ser um número inteiro igual ou maior que 1."})
        }

        const serie = await db.query("SELECT * FROM serie WHERE id=$1", [serie_id]);
        if (!serie.rowCount){
            return res.status(404).json({ msg:"Série inexistente."});
        }

        //Verificando se a série existe: 
        const r = await db.query("INSERT INTO episodio (titulo, sinopse, duracao, temporada, serie_id) VALUES ($1, $2, $3, $4, $5) RETURNING *", [titulo, sinopse, duracao, temporada, serie_id]);
        if (!r.rowCount) {
            return res.status(500).json({ msg:"Erro ao cadastrar episódio." });
        }

        return res.json({episodio: r.rows[0]});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
});

router.put("/:id", tipo, verificarAdministrador, async (req, res) => {
    try {
        const {titulo, sinopse, duracao, temporada} = req.body;

        const atual = await db.query("SELECT * FROM episodio WHERE id=$1", [req.params.id]);
        if (!atual.rowCount) {
            return res.status(404).json({ msg:"Episódio inexistente."});
        }

        if (!titulo || !sinopse || !duracao || !temporada){
            return res.status(404).json({ msg:"Algum parâmetro deve ser passado."});
        }

        // Verificando os atributos: 
        if(!isNaN(duracao) || duracao<1){
            return res.status(400).json({msg: "A duração deve ser um número inteiro maior que 0."})
        }
        if(!isNaN(temporada) || temporada<1){
            return res.status(400).json({msg: "A temporada deve ser um número inteiro igual ou maior que 1."})
        }


        const r = await db.query("UPDATE episodio SET titulo=$1, sinopse=$2, duracao=$3, temporada=$4 WHERE id=$5 RETURNING *", [titulo!=undefined ? titulo:atual.rows[0].titulo, sinopse!=undefined ? sinopse:atual.rows[0].sinopse, duracao!=undefined ? duracao:atual.rows[0].sinopse, temporada!=undefined || temporada <1 ? temporada:atual.rows[0].temporada, req.params.id]);
        if (!r.rowCount) {
            return res.status(500).json({msg:"Erro ao alterar episódio."});
        }

        return res.json({episodio: r.rows[0]});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
});

router.delete("/:id", tipo, verificarAdministrador, async (req, res) => {
    try {
        const r = await db.query("DELETE FROM episodio WHERE id=$1 RETURNING *", [req.params.id]);
        if (!r.rowCount) {
            return res.status(404).json({msg:"Episódio inexistente."});
        }

        return res.json({msg:"Episódio deletado com sucesso."});
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
});

module.exports = router;
