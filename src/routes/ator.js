const express=require("express");
const router=express.Router();
const db=require("../db");

const tipo=require("../middleware/tipo")

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res)=>{
    try{
        const r=await db.query("SELECT * FROM ator");
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há atores cadastrados."});
        }
        return res.status(200).json({atores:r.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

router.get("/:id", tipo, async (req, res)=>{
    try{
        const r=await db.query("SELECT * FROM ator WHERE id=$1", [req.params.id])
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há ator com esse id cadastrado."});
        }
        return res.json({ator:r.rows[0]})

    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

router.post("/",  upload.single("arquivo"), async (req, res)=>{
    try{
        const {nome, nacionalidade, data_nascimento, biografia, qtde_premios}=req.body

        if (!nome || !nacionalidade || !data_nascimento || !biografia || isNaN(qtde_premios) || !req.file){
            return res.status(400).json({msg:"Nem todos os parâmetros foram preenchidos corretamente"})
        }

        const { originalname, mimetype, size, buffer } = req.file;

        const query = "INSERT INTO arquivo (nome_original, tipo_mime, tamanho_bytes, conteudo) VALUES ($1, $2, $3, $4) RETURNING id";
        const r = await db.query(query, [originalname, mimetype, size, buffer]);
        if (!r.rowCount) { 
            return res.status(500).json({ msg: "Erro ao salvar o arquivo" }); 
        }

        const r2=await db.query("INSERT INTO ator(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, r.rows[0].id])
        if (!r2.rowCount) { 
            return res.status(500).json({ msg: "Erro ao cadastrar o ator" }); 
        }

        return res.json(r2)
    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

//PUT

router.delete("/:id", tipo, async(req, res)=>{
    try{
        const r=await db.query("SELECT fotografia FROM ator WHERE id=$1", [req.params.id])
        if(r.rowCount==0){
            return res.status(400).json({msg:"Ator inexistente"})
        }

        await db.query("DELETE FROM ator WHERE id=$1", [req.params.id])
        await db.query("DELETE FROM arquivo WHERE id=$1", [r.rows[0].fotografia])

        return res.json({msg:"Ator deletado com sucesso"})
    }catch(erro){
        res.status(500).json({msg:erro.message})
    }
})

module.exports=router;