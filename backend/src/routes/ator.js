const express=require("express");
const router=express.Router();
const db=require("../db");

const tipo=require("../middleware/tipo")
const verificarAdministrador = require("../middleware/verificarAdministrador");

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

//Pegar o id do ator pelo nome. Usado na pesquisa da navbar
router.get("/nome/:nome", async (req, res)=>{
    try{
        const r=await db.query("SELECT id FROM ator WHERE nome=$1", [req.params.nome])
        if (r.rowCount==0){
            return res.status(404).json({msg:"Não existe ator com esse nome"})
        }
        return res.json({ator:r.rows[0]})
    }catch(erro){
        return res.status(500).json({msg:erro.message})
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

router.post("/", verificarAdministrador, upload.single("arquivo"), async (req, res)=>{
    try{
        const {nome, nacionalidade, data_nascimento, biografia, qtde_premios}=req.body

        if (!nome){
            return res.status(400).json({msg:"O ator deve ter pelo menos um nome"})
        }

        var r2;
        if(!req.file){
            r2=await db.query("INSERT INTO ator(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, 1])
        }else{
            const formData = new FormData();
            formData.append( "arquivo", new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

            const r=await fetch("http://localhost:3000/arquivo", { method: "POST", body: formData })
            if (!r.ok) {
                return res.status(500).json({msg: "Erro ao salvar a imagem"});
            }

            const arquivo = await r.json();

            r2=await db.query("INSERT INTO ator(nome, nacionalidade, data_nascimento, biografia, qtde_premios, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, nacionalidade, data_nascimento, biografia, qtde_premios, arquivo.id])
        }

        if (!r2.rowCount) { 
            return res.status(500).json({ msg: "Erro ao cadastrar o ator" }); 
        }

        return res.json({ator:r2.rows[0]})
    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

//PUT
router.put("/:id", tipo, verificarAdministrador, upload.single("arquivo"), async (req, res)=>{
    try{
        const { biografia, qtde_premios } = req.body
        const id = req.params.id

        if (!biografia || !qtde_premios || !req.file){
            return res.status(400).json({msg:"O ator deve ter pelo menos um atributo para ser alterado!"})
        }

        if (biografia){
            r2=await db.query("UPDATE ator SET biografia=$1 WHERE id=$2", [biografia, id])
        }
        if (qtde_premios){
            r2=await db.query("UPDATE ator SET qtde_premios=$1 WHERE id=$2", [qtde_premios, id])
        }

        if (req.file){
            const formData = new FormData();
            formData.append( "arquivo", new Blob([req.file.buffer], { type: req.file.mimetype }), req.file.originalname);

            const r=await fetch("http://localhost:3000/arquivo", { method: "POST", body: formData })
            if (!r.ok) {
                return res.status(500).json({msg: "Erro ao salvar a imagem"});
            }
            const arquivo = await r.json();

            r2=await db.query("UPDATE ator SET fotografia = $1 WHERE id = $2", [r.id, id])
        }

        return res.json({ator:r2.rows[0]})
    }catch(erro){
        return res.status(500).json({msg:erro.message})
    }
})

router.delete("/:id", tipo, verificarAdministrador, tipo, async(req, res)=>{
    try{
        const r=await db.query("SELECT fotografia FROM ator WHERE id=$1", [req.params.id])
        if(r.rowCount==0){
            return res.status(400).json({msg:"Ator inexistente"})
        }

        await db.query("DELETE FROM ator WHERE id=$1", [req.params.id])
        if (r.rows[0].fotografia!=1 && r.rows[0].fotografia!=2){
            await fetch(`http://localhost:3000/arquivo/${r.rows[0].fotografia}`, {method:"DELETE"})
        }

        return res.json({msg:"Ator deletado com sucesso"})
    }catch(erro){
        res.status(500).json({msg:erro.message})
    }
})

module.exports=router;