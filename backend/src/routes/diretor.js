const express=require("express");
const router=express.Router();
const db=require("../db");

const tipo=require("../middleware/tipo")

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res)=>{
    try{
        const r=await db.query("SELECT * FROM diretor");
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há diretores cadastrados."});
        }
        return res.status(200).json({diretores:r.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
})

router.get("/:id", tipo, async (req, res)=>{
    try{
        const r=await db.query("SELECT * FROM diretor WHERE id=$1", [req.params.id])
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há diretor com esse id cadastrado."});
        }
        return res.json({diretor:r.rows[0]})

    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

router.post("/",  upload.single("arquivo"), async (req, res)=>{
    try{
        const {nome, nacionalidade, data_nascimento, biografia, qtde_premios}=req.body

        if (!nome){
            return res.status(400).json({msg:"O diretor deve ter pelo menos um nome"})
        }

        var r2;
        if(!req.file){
            r2=await db.query("INSERT INTO diretor(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, 1])
        }else{
            const formData = new FormData();
            formData.append( "arquivo", new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

            const r=await fetch("http://localhost:3000/arquivo", { method: "POST", body: formData })
            if (!r.ok) {
                return res.status(500).json({msg: "Erro ao salvar a imagem"});
            }

            const arquivo = await r.json();

            r2=await db.query("INSERT INTO diretor(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, arquivo.id])
        }

        if (!r2.rowCount) { 
            return res.status(500).json({ msg: "Erro ao cadastrar o diretor" }); 
        }

        return res.json({diretor:r2.rows[0]})
    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

//PUT

router.delete("/:id", tipo, async(req, res)=>{
    try{
        const r=await db.query("SELECT fotografia FROM diretor WHERE id=$1", [req.params.id])
        if(r.rowCount==0){
            return res.status(400).json({msg:"Diretor inexistente"})
        }

        await db.query("DELETE FROM diretor WHERE id=$1", [req.params.id])
        if (r.rows[0].fotografia!=1 && r.rows[0].fotografia!=2){
            await fetch(`http://localhost:3000/arquivo/${r.rows[0].fotografia}`, {method:"DELETE"})
        }

        return res.json({msg:"Diretor deletado com sucesso"})
    }catch(erro){
        res.status(500).json({msg:erro.message})
    }
})

module.exports=router;