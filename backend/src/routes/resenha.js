const express=require("express");
const router=express.Router();
const db=require("../db");

//GET - filme e série, em conjunto

router.get("/", async (req, res)=>{
    try{
        const rf=await db.query("SELECT * FROM resenha_filme");
        const rs=await db.query("SELECT * FROM resenha_serie");
        if(!rf.rowCount&&!rs.rowCount){
            return res.status(400).json({msg:"Não há resenhas cadastradas."});
        }
        return res.status(200).json({resenhas_filme:rf.rows, resenhas_serie:rs.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})
router.get("/publico", async (req, res)=>{
    try{
        const rf=await db.query("SELECT resenha_filme.* FROM resenha_filme JOIN usuario ON resenha_filme.usuario_id=usuario.id WHERE usuario.critico=false");
        const rs=await db.query("SELECT resenha_serie.* FROM resenha_serie JOIN usuario ON resenha_serie.usuario_id=usuario.id WHERE usuario.critico=false");
        if(!rf.rowCount&&!rs.rowCount){
            return res.status(400).json({msg:"Não há resenhas do público cadastradas."});
        }
        return res.status(200).json({resenhas_filme:rf.rows, resenhas_serie:rs.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})
router.get("/critico", async (req, res)=>{
    try{
        const rf=await db.query("SELECT resenha_filme.* FROM resenha_filme JOIN usuario ON resenha_filme.usuario_id=usuario.id WHERE usuario.critico=true");
        const rs=await db.query("SELECT resenha_serie.* FROM resenha_serie JOIN usuario ON resenha_serie.usuario_id=usuario.id WHERE usuario.critico=true");
        if(!rf.rowCount&&!rs.rowCount){
            return res.status(400).json({msg:"Não há resenhas da crítica cadastradas."});
        }
        return res.status(200).json({resenhas_filme:rf.rows, resenhas_serie:rs.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

//POST - filme e série
//conferir se usuário é administrador

router.post("/filme", async (req, res)=>{
    try{
        const {usuario_id, filme_id, resenha, avaliacao}=req.body||{};
        if(!usuario_id){return res.status(400).json({msg:"Id do usuário não informado!"});}
        if(!filme_id){return res.status(400).json({msg:"Id do filme não informado!"});}
        if(!resenha){return res.status(400).json({msg:"Resenha não informada!"});}
        if(!avaliacao){return res.status(400).json({msg:"Avaliação não informada!"});}
        //conferir validade dos valores de usuario_id, filme_id, avalicao
        //conferir chaves estrangeiras
        const r=await db.query("INSERT INTO resenha_filme (usuario_id, filme_id, resenha, avaliacao) VALUES ($1, $2, $3, $4)", [usuario_id, filme_id, resenha, avaliacao]);
        return res.status(201).json({msg:"Resenha adicionada com sucesso!", resenha:r.rows[0]});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})
router.post("/serie", async (req, res)=>{
    try{
        const {usuario_id, serie_id, resenha, avaliacao}=req.body||{};
        if(!usuario_id){return res.status(400).json({msg:"Id do usuário não informado!"});}
        if(!serie_id){return res.status(400).json({msg:"Id da série não informado!"});}
        if(!resenha){return res.status(400).json({msg:"Resenha não informada!"});}
        if(!avaliacao){return res.status(400).json({msg:"Avaliação não informada!"});}
        //conferir validade dos valores de usuario_id, serie_id, avalicao
        //conferir chaves estrangeiras
        const r=await db.query("INSERT INTO resenha_serie (usuario_id, serie_id, resenha, avaliacao) VALUES ($1, $2, $3, $4)", [usuario_id, serie_id, resenha, avaliacao]);
        return res.status(201).json({msg:"Resenha adicionada com sucesso!", resenha:r.rows[0]});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

//PUT - filme e série
//O usuário e objeto da resenha não podem ser alterados.
router.put("/filme/:id", async (req, res)=>{
    try{
        const id=req.params.id||{};
        //conferir validade do id
        if(!id){return res.status(400).json({msg:"Id da resenha não informado!"});}
        const ra=await db.query("SELECT resenha, avaliacao FROM resenha_filme WHERE id=$1", [id]);
        if(!ra.rowCount){return res.status(400).json({msg:"Resenha com id informado não existe!"});}
        const rA=ra.rows[0];
        //conferir se o usuário é autor da resenha ou administrador quando usuario.js for finalizada
        const {resenha, avaliacao}=req.body||{};
        if(!resenha){resenha=rA.resenha;}
        if(!avaliacao){avaliacao=rA.avaliacao;}
        const r=await db.query("UPDATE resenha_filme SET resenha=$1, avaliacao=$2 WHERE id=$3 RETURNING *", [resenha, avaliacao, id]);
        return res.status(200).json({msg:"Resenha atualizada com sucesso!", resenha:r.rows[0]});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})
router.put("/serie/:id", async (req, res)=>{
    try{
        const id=req.params.id||{};
        //conferir validade do id
        if(!id){return res.status(400).json({msg:"Id da resenha não informado!"});}
        const ra=await db.query("SELECT resenha, avaliacao FROM resenha_serie WHERE id=$1", [id]);
        if(!ra.rowCount){return res.status(400).json({msg:"Resenha com id informado não existe!"});}
        const rA=ra.rows[0];
        //conferir se o usuário é autor da resenha ou administrador quando usuario.js for finalizada
        const {resenha, avaliacao}=req.body||{};
        if(!resenha){resenha=rA.resenha;}
        if(!avaliacao){avaliacao=rA.avaliacao;}
        const r=await db.query("UPDATE resenha_serie SET resenha=$1, avaliacao=$2 WHERE id=$3 RETURNING *", [resenha, avaliacao, id]);
        return res.status(200).json({msg:"Resenha atualizada com sucesso!", resenha:r.rows[0]});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

//DELETE - filme e série

router.delete("/filme/:id", async (req, res)=>{
    const id=req.params.id||{};
    if(!id){return res.status(400).json({msg:"Id da resenha não informado!"});}
    //conferir se o usuário é autor da resenha ou administrador quando usuario.js for finalizada
    const r=await db.query("DELETE FROM resenha_filme WHERE id=$1", [id]);
    return res.status(200).json({msg:"Resenha apagada com sucesso!"});
})
router.delete("/serie/:id", async (req, res)=>{
    const id=req.params.id||{};
    if(!id){return res.status(400).json({msg:"Id da resenha não informado!"});}
    //conferir se o usuário é autor da resenha ou administrador quando usuario.js for finalizada
    const r=await db.query("DELETE FROM resenha_serie WHERE id=$1", [id]);
    return res.status(200).json({msg:"Resenha apagada com sucesso!"});
})
//A fazer :DELETE (s)
module.exports=router;