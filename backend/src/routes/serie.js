const express=require("express");
const router=express.Router();
const db=require("../db");

router.get("/", async (req, res)=>{
    try{
        const r=await db.query("SELECT * FROM serie");
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há séries cadastrados."});
        }
        return res.status(200).json({series:r.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
});

router.get("/:id", async (req, res)=>{
    try{
        let id = req.params.id

        const r=await db.query("SELECT * FROM serie WHERE id=$1", [id]);
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há séries cadastrados."});
        }
        return res.status(200).json({serie:r.rows[0]});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
});

module.exports=router;