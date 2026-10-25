function tipo(req, res, next){
    if (isNaN(req.params.id)){
        return res.json({msg:"O id deve ser um número inteiro"})
    }
    next()
}

module.exports=tipo