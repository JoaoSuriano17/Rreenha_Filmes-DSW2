const express = require("express");
const router = express.Router();
const db = require("../db");

const tipo = require("../middleware/tipo");
const verificarAdministrador = require("../middleware/verificarAdministrador");

const jwt = require("jsonwebtoken");
const senhaTokenJWT = "senhaSecretissimaIFSP";

function tokenArmazenar(req, res, next) {   
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({msg: "Token não informado."});
    }

    const partes = authorization.split(" ");
    const tokenJWT = partes[1];
    try {
        const dados = jwt.verify(tokenJWT, senhaTokenJWT);
        req.usuario_id = dados.data;
        next();

    } catch (erro) {
        return res.status(401).json({msg: "Token inválido ou expirado.",});
    }
}

/*router.get("/filmes", tipo, tokenArmazenar, async (req, res) => {
    try {
        const r = await db.query("SELECT resenha_filme.resenha, resenha_filme.avaliacao, filme.titulo, diretor.nome FROM resenha_filme JOIN filme ON resenha_filme.filme_id = filme.id JOIN diretor ON filme.diretor = diretor.id WHERE usuario_id = $1", [req.usuario_id])
        if (!r.rowCount) {
            return res.status(400).json({ msg:"O requerinte não possui resenha nesse filme." });
        }
        return res.status(200).json({resenha: r.rows[0]});
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})*/


//GET - todas resenhas, de filmes e séries
router.get("/", async (req, res) => {
    try {
        const rf = await db.query("SELECT * FROM resenha_filme");
        const rs = await db.query("SELECT * FROM resenha_serie");
        if (!rf.rowCount && !rs.rowCount) {
            return res.status(400).json({ msg: "Não há resenhas cadastradas." });
        }
        return res.status(200).json({ resenhas_filme: rf.rows, resenhas_serie: rs.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

//GET - resenhas de um usuário específico; requer id
router.get("/autor/:id", async (req, res)=>{
    try{
        const id=req.params.id||{};
        if(!id){
            return res.status(400).json({msg:"Id não informado!"});
        }
        const rf=await db.query("SELECT * FROM resenha_filme WHERE usuario_id=$1", [id]);
        const rs=await db.query("SELECT * FROM resenha_serie WHERE usuario_id=$1", [id]);
        return res.status(200).json({resenhas_filme: rf.rows, resenhas_serie: rs.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

//GET - resenhas do público ou da crítica
router.get("/publico", async (req, res) => {
    try {
        const rf = await db.query("SELECT resenha_filme.* FROM resenha_filme JOIN usuario ON resenha_filme.usuario_id=usuario.id WHERE usuario.critico=false");
        const rs = await db.query("SELECT resenha_serie.* FROM resenha_serie JOIN usuario ON resenha_serie.usuario_id=usuario.id WHERE usuario.critico=false");
        if (!rf.rowCount && !rs.rowCount) {
            return res.status(400).json({ msg: "Não há resenhas do público cadastradas." });
        }
        return res.status(200).json({ resenhas_filme: rf.rows, resenhas_serie: rs.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})
router.get("/critico", async (req, res) => {
    try {
        const rf = await db.query("SELECT resenha_filme.* FROM resenha_filme JOIN usuario ON resenha_filme.usuario_id=usuario.id WHERE usuario.critico=true");
        const rs = await db.query("SELECT resenha_serie.* FROM resenha_serie JOIN usuario ON resenha_serie.usuario_id=usuario.id WHERE usuario.critico=true");
        if (!rf.rowCount && !rs.rowCount) {
            return res.status(400).json({ msg: "Não há resenhas da crítica cadastradas." });
        }
        return res.status(200).json({ resenhas_filme: rf.rows, resenhas_serie: rs.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

//GET - avaliação média, de filme e série; requer id do filme ou série
router.get("/avaliacao_media/filme/:id", async (req, res)=>{
    try{
        const id=req.params.id||{};
        if(!id){
            return res.status(400).json({msg:"Id do filme não informado!"});
        }
        const r0=await db.query("SELECT * FROM filme WHERE id = $1", [filme_id]);
        if(!r0.rowCount){
            res.status(404).json({msg:"Filme inexistente."});
        }
        const r=await db.query("SELECT avaliacao FROM resenha_filme WHERE filme_id=$1", [id]);
        let am=0;
        for(row of r.rows){
            am+=row.avaliacao;
        }
        am/=r.rows.length;
        return res.status(200).json({avaliacao_media:am});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})
router.get("/avaliacao_media/serie/:id", async (req, res)=>{
    try{
        const id=req.params.id||{};
        if(!id){
            return res.status(400).json({msg:"Id da série não informado!"});
        }
        const r0=await db.query("SELECT * FROM serie WHERE id = $1", [serie_id]);
        if(!r0.rowCount){
            res.status(404).json({msg:"Série inexistente."});
        }
        const r=await db.query("SELECT avaliacao FROM resenha_serie WHERE serie_id=$1", [id]);
        let am=0;
        for(row of r.rows){
            am+=row.avaliacao;
        }
        am/=r.rows.length;
        return res.status(200).json({avaliacao_media:am});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

//POST - filme e série
router.post("/filme", tokenArmazenar, async (req, res) => {
    try {
        const { filme_id, resenha, avaliacao } = req.body || {};

        if (!filme_id) { return res.status(400).json({ msg: "Id do filme não informado!" }); }
        if (!resenha) { return res.status(400).json({ msg: "Resenha não informada!" }); }
        if (!avaliacao) { return res.status(400).json({ msg: "Avaliação não informada!" }); }

        const r1 = await db.query("SELECT * FROM filme WHERE id = $1", [filme_id])
        if (!r1.rowCount){
            res.status(404).json({msg:"Filme inexistente."})
        }

        if (isNaN(avaliacao) || avaliacao<0 || avaliacao>100){
            return res.status(400).json({ msg: "Avaliação deve ser um número entre 0 e 100."})
        }

        const r2 = await db.query("SELECT * FROM resenha_filme WHERE usuario_id = $1 and filme_id=$2", [req.usuario_id, filme_id])
        if (r2.rowCount){
            return res.status(400).json({msg: "Resenha já está em filme."})
        }

        const r = await db.query("INSERT INTO resenha_filme (usuario_id, filme_id, resenha, avaliacao) VALUES ($1, $2, $3, $4)", [req.usuario_id, filme_id, resenha, avaliacao]);
        return res.status(201).json({ msg: "Resenha adicionada com sucesso!", resenha: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})
router.post("/serie", tokenArmazenar, async (req, res) => {
    try {
        const { serie_id, resenha, avaliacao } = req.body || {};

        if (!serie_id) { return res.status(400).json({ msg: "Id do filme não informado!" }); }
        if (!resenha) { return res.status(400).json({ msg: "Resenha não informada!" }); }
        if (!avaliacao) { return res.status(400).json({ msg: "Avaliação não informada!" }); }

        const r1 = await db.query("SELECT * FROM serie WHERE id = $1", [serie_id])
        if (!r1.rowCount){
            res.status(404).json({msg:"Serie inexistente."})
        }

        if (isNaN(avaliacao) || avaliacao<0 || avaliacao>100){
            return res.status(400).json({ msg: "Avaliação deve ser um número entre 0 e 100."})
        }

        const r2 = await db.query("SELECT * FROM resenha_serie WHERE usuario_id = $1 and serie_id=$2", [req.usuario_id, serie_id])
        if (r2.rowCount){
            return res.status(400).json({msg: "Resenha já está em serie."})
        }

        const r = await db.query("INSERT INTO resenha_serie (usuario_id, serie_id, resenha, avaliacao) VALUES ($1, $2, $3, $4)", [req.usuario_id, serie_id, resenha, avaliacao]);
        return res.status(201).json({ msg: "Resenha adicionada com sucesso!", resenha: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
})

//PUT - filme e série
//O usuário e objeto da resenha não podem ser alterados.
router.put("/filme/:id", tipo, tokenArmazenar, async (req, res) => {
    try {
        let ra = await db.query("SELECT resenha, avaliacao FROM resenha_filme WHERE filme_id=$1 AND usuario_id=$2", [req.body.filme_id, req.usuario_id]);
        if (!ra.rowCount) { return res.status(400).json({ msg: "Usuário não tem resenha neste filme!" }); }
        
        const { resenha, avaliacao } = req.body || {};
        if(!resenha){
            return res.status(400).json({msg: "Resenha é obrigatória."})
        }
        if(!avaliacao){
            return res.status(400).json({msg: "Avaliação é obrigatória."})
        }

        if (isNaN(avaliacao) || avaliacao<0 || avaliacao>100){
            return res.status(400).json({ msg: "Avaliação deve ser um número entre 0 e 100."})
        }

        const r = await db.query("UPDATE resenha_filme SET resenha=$1, avaliacao=$2 WHERE id=$3 RETURNING *", [resenha, avaliacao, req.params.id]);
        return res.status(200).json({ msg: "Resenha atualizada com sucesso!", resenha: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

router.put("/serie/:id", tipo, tokenArmazenar, async (req, res) => {
    try {
        let ra = await db.query("SELECT resenha, avaliacao FROM resenha_serie WHERE serie_id=$1 AND usuario_id=$2", [req.body.serie_id, req.usuario_id]);
        if (!ra.rowCount) { return res.status(400).json({ msg: "Usuário não tem resenha nessa série!" }); }
        
        const { resenha, avaliacao } = req.body || {};
        if(!resenha){
            return res.status(400).json({msg: "Resenha é obrigatória."})
        }
        if(!avaliacao){
            return res.status(400).json({msg: "Avaliação é obrigatória."})
        }

        if (isNaN(avaliacao) || avaliacao<0 || avaliacao>100){
            return res.status(400).json({ msg: "Avaliação deve ser um número entre 0 e 100."})
        }

        const r = await db.query("UPDATE resenha_serie SET resenha=$1, avaliacao=$2 WHERE id=$3 RETURNING *", [resenha, avaliacao, req.params.id]);
        return res.status(200).json({ msg: "Resenha atualizada com sucesso!", resenha: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
})

//DELETE - filme e série
router.delete("/filme/:id", tipo, tokenArmazenar, async (req, res) => {
    const r = await db.query("DELETE FROM resenha_filme WHERE usuario_id=$1 AND filme_id RETURNING *", [req.usuario_id, req.params.id]);
    if (!r.rowCount){
        return res.status(400).json({msg: "Erro ao deletar resenha de filme."})
    }
    return res.status(200).json({ msg: "Resenha apagada com sucesso!"});
})
router.delete("/serie/:id", async (req, res) => {
    const r = await db.query("DELETE FROM resenha_serie WHERE usuario_id=$1 AND serie_id RETURNING *", [req.usuario_id, req.params.id]);
    if (!r.rowCount){
        return res.status(400).json({msg: "Erro ao deletar resenha de série."})
    }
    return res.status(200).json({ msg: "Resenha apagada com sucesso!"});
})

module.exports = router;