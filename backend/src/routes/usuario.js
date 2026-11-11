const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const senhaTokenJWT = "senhaSecretissimaIFSP";

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

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
router.post("/", upload.single("arquivo"), async (req, res) => {
    try {
        let { nome, email, senha, critico, administrador } = req.body || {};
        if (!nome) { return res.status(400).json({ msg: "Nome não informado!" }); }
        if (!email) { return res.status(400).json({ msg: "E-mail não informado!" }); }
        if (!senha) { return res.status(400).json({ msg: "Senha não informada!" }); }

        let fotografia = null
        if (req.file) {
            const formData = new FormData();
            formData.append(
                "arquivo",
                new Blob([req.file.buffer], {
                    type: req.file.mimetype
                }),
                req.file.originalname
            );

            const resposta = await fetch("http://localhost:3000/arquivo", {
                method: "POST",
                body: formData
            });

            if (!resposta.ok) {
                return res.status(500).json({ msg: "Erro ao salvar a fotografia!" });
            }

            const arquivo = await resposta.json();
            fotografia = arquivo.arquivo.id;
        }
        const senhaHash = await bcrypt.hash(senha, 12);
        if (critico) {
            if (critico == "True" || critico == "true") {
                critico = true
            }
        }
        critico = false

        if (administrador) {
            if (administrador == "True" || administrador == "true") {
                administrador = true
            }
        }
        administrador = true

        const r = await db.query("INSERT INTO usuario(nome, email, critico, administrador, senha, fotografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, nome, email, critico, administrador, fotografia", [nome, email, critico, administrador, senhaHash, fotografia]);

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
router.put("/", verificarToken, upload.single("arquivo"), async (req, res) => {
    try {
        const { nome, senha } = req.body || {};
        if (nome) {
            var ra = await db.query("UPDATE usuario SET nome=$1 WHERE id=$2 RETURNING *", [nome, req.user]);
            if (!ra.rowCount) {
                return res.status(400).json({ msg: "Erro ao alterar nome." })
            }
        }
        if (senha) {
            const senhaHash = await bcrypt.hash(senha, 12);
            var re = await db.query("UPDATE usuario SET senha=$1 WHERE id=$2 RETURNING *", [senhaHash, req.user]);
            if (!re.rowCount) {
                return res.status(400).json({ msg: "Erro ao alterar nome." })
            }
        }

        if (req.file) {
            const formData = new FormData();
            formData.append(
                "arquivo",
                new Blob([req.file.buffer], { type: req.file.mimetype }),
                req.file.originalname
            );

            const r = await fetch("http://localhost:3000/arquivo", {
                method: "POST",
                body: formData
            });

            if (!r.ok) {
                return res.status(500).json({ msg: "Erro ao salvar o novo cartaz!" });
            }
            const arquivo = await r.json();
            await db.query("UPDATE usuario SET fotografia = $1 WHERE id = $2", [arquivo.arquivo.id, req.user]);
        }

        let r = await db.query("SELECT nome, email FROM usuario WHERE id=$1", [req.user]);
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
router.put("/:id/administrador", verificarAdministrador, async (req, res) => {
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
