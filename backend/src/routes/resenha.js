const express=require("express");
const router=express.Router();
const db=require("../db");

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
module.exports=router;