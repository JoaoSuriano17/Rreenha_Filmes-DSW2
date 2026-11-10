const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const senhaTokenJWT = "senhaSecretissimaIFSP";

const verificarAdministrador = require("../middleware/verificarAdministrador");

// Função middleware que recebe o token do usuário, verifica se é válido e de um usuário permitido. Se der erro, bloqueia a requisição.
function verificarToken(req, res, next) {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];

        if (!token) {
            return res.status(403).json({ msg: "Token inválido" });
        }

        jwt.verify(token, senhaTokenJWT, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ msg: "Token inválido" });
            }
            // Token parece válido, mas será que o usuário existe???
            const r = await db.query("SELECT COUNT(*) as qtde FROM usuario WHERE id = $1", [
                decoded.data,
            ]);
            if (!r.rows[0].qtde) {
                // O usuário não existe mais no banco. Nega o acesso.
                return res.status(403).json({ msg: "Token inválido" });
            }
            // Tudo certo... Coloca em req.user o ID do usuário logado.
            req.user = decoded.data;
            next();
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}

//GET - Todos
router.get("/", async (req, res) => {
    try {
        const r = await db.query("SELECT id, nome, email, critico, administrador, fotografia FROM usuario");
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há usuários cadastrados." });
        }
        return res.status(200).json({ usuarios: r.rows });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});
//GET - Específico, por id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id || {};
        if (!id) { return res.status(400).json({ msg: "Id do usuário não informado!" }); }
        //conferir se id é válido/numérico
        const r = await db.query("SELECT id, nome, email, critico, administrador, fotografia FROM usuario WHERE id=$1", [id]);
        if (!r.rowCount) {
            return res.status(400).json({ msg: "Não há usuários cadastrados." });
        }
        return res.status(200).json({ usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});
//POST - Criação (Requer: nome, email, senha)
router.post("/", async (req, res) => {
    try {
        //Imagina-se que os parâmetros crítico e administrador não estariam na requisição, pois poderiam apenas ser conferidos por um administrador. No entanto não é assim que está.
        let { nome, email, critico, administrador, senha, fotografia } = req.body || {};
        if (!nome) { return res.status(400).json({ msg: "Nome não informado!" }); }
        if (!email) { return res.status(400).json({ msg: "E-mail não informado!" }); }
        if (!senha) { return res.status(400).json({ msg: "Senha não informada!" }); }
        if (!critico) { critico = false; }
        if (!administrador) { administrador = false; }
        if (!fotografia) { fotografia = null; }

        const senhaHash = await bcrypt.hash(senha, 12);
        const r = await db.query("INSERT INTO usuario (nome, email, critico, administrador, senha, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [nome, email, critico, administrador, senhaHash, fotografia]);
        return res.status(201).json({ msg: "Usuário criado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});
//POST - Login (Requer: email, senha)
router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body || {};
        if (!email) { return res.status(400).json({ msg: "E-mail não informado!" }); }
        if (!senha) { return res.status(400).json({ msg: "Senha não informada!" }); }
        const r = await db.query("SELECT * FROM usuario WHERE email=$1", [email]);
        if (!r.rowCount) { return res.status(400).json({ msg: "Usuário não existe!" }); }
        const confere = await bcrypt.compare(senha, r.rows[0].senha);
        if (!confere) { return res.status(400).json({ msg: "Senha incorreta!" }); }
        const tokenJWT = jwt.sign(
            { data: r.rows[0].id },
            senhaTokenJWT
        );
        return res.status(200).json({ msg: "Login realizado com sucesso!", token: tokenJWT });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

//PUT - Específico, por id
router.put("/:id", verificarToken, async (req, res) => {
    try {
        const id = req.params.id || {};
        if (!id) { return res.status(400).json({ msg: "Id não informado!" }); }
        if (Number(req.params.id) !== Number(req.user)) {
            return res.status(403).json({ msg: "Você não pode alterar outro usuário!" });
        }
        const { nome, email, senha, fotografia } = req.body || {};
        //if(!token){return res.status(401).json({msg:"É preciso estar autenticado para alterar um usuário!"});}
        let r = await db.query("SELECT * FROM usuario WHERE id=$1", [id]);
        if (nome) { r = await db.query("UPDATE usuario SET nome=$1 RETRUNING *", [nome]); }
        if (email) { r = await db.query("UPDATE usuario SET email=$1 RETURNING *", [email]); }
        if (senha) {
            const senhaHash = await bcrypt.hash(senha, 12);
            r = await db.query("UPDATE usuario SET senha=$1 RETURNING *", [senhaHash]);
        }
        if (fotografia) { r = await db.query("UPDATE usuario SET fotografia=$1 RETURNING *", [fotografia]); }
        return res.status(200).json({ msg: "Usuário alterado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});
//PUT - Específico, por id, altera atributo crítico
router.put("/:id/critico", verificarAdministrador, async (req, res) => {
    try {
        const id = req.params.id || {};
        if (!id) { return res.status(400).json({ msg: "Id não informado!" }); }
        const critico = req.body || {};
        if (!critico) { return res.status(400).json({ msg: "Não foi informado se o usuário é crítico!" }); }
        const r = await db.query("UPDATE usuario SET critico=$1 RETURNING *", [critico]);
        return res.status(200).json({ msg: "Usuário alterado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

//PUT - Específico, por id, altera atributo administrador
router.put("/:id/critico", verificarAdministrador, async (req, res) => {
    try {
        const id = req.params.id || {};
        if (!id) { return res.status(400).json({ msg: "Id não informado!" }); }
        const administrador = req.body || {};
        if (!administrador) { return res.status(400).json({ msg: "Não foi informado se o usuário é administrador!" }); }
        const r = await db.query("UPDATE usuario SET administrador=$1 RETURNING *", [administrador]);
        return res.status(200).json({ msg: "Usuário alterado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});

//DELETE - Específico, por token
router.delete("/", verificarToken, async (req, res) => {
    try {
        //const id=req.params.id||{};
        //if(!id){return res.status(400).json({msg:"Id não informado!"});}
        const r = await db.query("DELETE FROM usuario WHERE id=$1 RETURNING *", [req.user]);
        //Assim, apenas um usuário pode deletar a si próprio.
        if (!r.rowCount) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        return res.status(200).json({ msg: "Usuário apagado com sucesso!", usuario: r.rows[0] });
    } catch (erro) {
        return res.status(500).json({ msg: erro.message });
    }
});
module.exports = router;
