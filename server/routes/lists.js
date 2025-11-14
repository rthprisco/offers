import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

// Listar todas as listas

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM lists ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Criar nova lista
router.post("/", async (req, res) => {
  console.log("BODY RECEBIDO:", req.body);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "nome é obrigatório" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO lists (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Excluir lista
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM lists WHERE id = $1", [req.params.id]);
    res.json({ message: "Lista excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
