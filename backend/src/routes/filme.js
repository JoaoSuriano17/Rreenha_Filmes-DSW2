const express=require("express");
const router=express.Router();
const db=require("../db");

const tipo=require("../middleware/tipo")

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res)=>{
    try{
        const r=await db.query("SELECT * FROM filme");
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há filmes cadastrados."});
        }
        return res.status(200).json({filmes:r.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

router.get("/:id", tipo, async (req, res)=>{
    try{
        const r=await db.query("SELECT * FROM filme WHERE id=$1", [req.params.id])
        if (r.rowCount==0){
            return res.status(404).json({msg:"Não existe filme com esse id"})
        }
        return res.json({filme:r.rows[0]})
    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

router.post("/", upload.single("arquivo"), async (req,res)=>{
    try{
        const {titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios}=req.body
        
        if (!titulo || ! diretor){
            return res.status(400).json({msg:"O filme deve ter um titulo e um diretor pelo menos"})
        }

        var r2;
        if(!req.file){
            r2=await db.query("INSERT INTO filme(titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, cartaz) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, 2])
        }else{
            const { originalname, mimetype, size, buffer } = req.file;
            const query = "INSERT INTO arquivo (nome_original, tipo_mime, tamanho_bytes, conteudo) VALUES ($1, $2, $3, $4) RETURNING id";
            const r = await db.query(query, [originalname, mimetype, size, buffer]);
            if (!r.rowCount) { 
                return res.status(500).json({ msg: "Erro ao salvar a imagem" }); 
            }
            r2=await db.query("INSERT INTO filme(titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, cartaz) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [titulo, diretor, sinopse, faixa_etaria, duracao, qtde_premios, req.rows[0].id])
        }

        if (!r2.rowCount) { 
            return res.status(500).json({ msg: "Erro ao cadastrar o filme" }); 
        }

        return res.json({filme:r2.rows[0]})
    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

router.delete("/:id", tipo, async(req, res)=>{
    try{
        const r=await db.query("SELECT cartaz FROM filme WHERE id=$1", [req.params.id])
        if(r.rowCount==0){
            return res.status(400).json({msg:"Filme inexistente"})
        }

        await db.query("DELETE FROM filme WHERE id=$1", [req.params.id])

        if (req.rows[0].cartaz!=1 && req.rows[0].cartaz!=2){
            await db.query("DELETE FROM arquivo WHERE id=$1", [r.rows[0].cartaz])
        }

        return res.json({msg:"Filme deletado com sucesso"})
    }catch(erro){
        res.status(500).json({msg:erro.message})
    }
})

module.exports=router;