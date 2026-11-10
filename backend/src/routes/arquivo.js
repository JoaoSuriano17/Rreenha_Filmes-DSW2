
const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");

// Configuração do Multer
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de imagem são permitidos."));
    }
  }
});

// GET /arquivo
// Lista as imagens sem retornar seus conteúdos binários.
router.get("/", async (req, res) => {
  try {
    const sql = `
            SELECT id, nome_original, tipo_mime, tamanho_bytes
            FROM arquivo_imagem
            ORDER BY id
        `;

    const resultado = await db.query(sql);

    return res.status(200).json(resultado.rows);

  } catch (err) {
    console.error("Erro ao listar imagens:", err);

    return res.status(500).json({
      msg: "Erro ao consultar as imagens."
    });
  }
});

// GET /arquivo/:id
// Retorna o conteúdo binário da imagem.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
            SELECT conteudo, tipo_mime
            FROM arquivo_imagem
            WHERE id = $1
        `;

    const resultado = await db.query(sql, [id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        msg: "Imagem não encontrada."
      });
    }

    const imagem = resultado.rows[0];

    res.setHeader("Content-Type", imagem.tipo_mime);
    return res.send(imagem.conteudo);

  } catch (err) {
    console.error("Erro ao buscar imagem:", err);

    return res.status(500).json({
      msg: "Erro ao buscar a imagem."
    });
  }
});

// POST /arquivo
// Recebe e armazena uma imagem no PostgreSQL.
router.post("/", upload.single("arquivo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        msg: "Nenhum arquivo foi enviado."
      });
    }

    const sql = `
            INSERT INTO arquivo_imagem
                (nome_original, tipo_mime, tamanho_bytes, conteudo)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nome_original, tipo_mime, tamanho_bytes
        `;

    const valores = [
      req.file.originalname,
      req.file.mimetype,
      req.file.size,
      req.file.buffer
    ];

    const resultado = await db.query(sql, valores);

    return res.status(201).json({
      msg: "Imagem cadastrada com sucesso.",
      arquivo: resultado.rows[0]
    });

  } catch (err) {
    console.error("Erro ao cadastrar imagem:", err);

    return res.status(500).json({
      msg: "Erro ao salvar a imagem no banco de dados.",
      erro: err.message
    });
  }
});

// DELETE /arquivo/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const sql = `
            DELETE FROM arquivo_imagem
            WHERE id = $1
            RETURNING id
        `;

    const resultado = await db.query(sql, [id]);

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        msg: "Imagem não encontrada."
      });
    }

    return res.status(200).json({
      msg: "Imagem excluída com sucesso.",
      id: resultado.rows[0].id
    });

  } catch (err) {
    console.error("Erro ao excluir imagem:", err);

    // Violação de chave estrangeira:
    // a imagem ainda está sendo utilizada por outra tabela.
    if (err.code === "23503") {
      return res.status(409).json({
        msg: "Não é possível excluir esta imagem, pois ela está vinculada a outro registro."
      });
    }

    return res.status(500).json({
      msg: "Erro ao excluir a imagem."
    });
  }
});

// Middleware para tratar erros do Multer.
// Deve ficar depois das rotas.
router.use((err, req, res, next) => {
  console.error("Erro no upload:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        msg: "Arquivo muito grande. O limite é de 5 MB."
      });
    }

    return res.status(400).json({
      msg: err.message,
      codigo: err.code,
      campo: err.field
    });
  }

  return res.status(400).json({
    msg: err.message || "Erro ao processar o envio do arquivo."
  });
});

module.exports = router;
