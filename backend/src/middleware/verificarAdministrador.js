const db = require("../db");
const jwt = require("jsonwebtoken");
const senhaTokenJWT = "senhaSecretissimaIFSP";

async function verificarAdministrador(req, res, next) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(403).json({
                msg: "Token não informado!"
            });
        }

        const decoded = jwt.verify(token, senhaTokenJWT);
        const r = await db.query("SELECT administrador FROM usuario WHERE id = $1",[decoded.data]);
        if (!r.rowCount) {
            return res.status(403).json({msg: "Usuário não encontrado!"});
        }

        if (r.rows[0].administrador !== true) {
            return res.status(403).json({msg: "Usuário não é administrador!"});
        }

        req.user = decoded.data;
        next();

    } catch (erro) {
        return res.status(500).json({msg: erro.message});
    }
}

module.exports = verificarAdministrador;