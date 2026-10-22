const express=require("express");
const router=express.Router();
const db=require("../db");

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
module.exports=router;