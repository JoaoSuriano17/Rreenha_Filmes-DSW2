/*
const express=require("express");
const router=express.Router();
const db=require("../db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

router.get("/", async (req, res)=>{
    try{
        const r=await db.query("SELECT id, nome, email, critico, administrador FROM usuario");
        if(!r.rowCount){
            return res.status(400).json({msg:"Não há usuários cadastrados."});
        }
        return res.status(200).json({usuarios:r.rows});
    }catch(erro){
        return res.status(500).json({msg:erro.message});
    }
});
module.exports =router;
*/