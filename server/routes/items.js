import express from "express";
import pool from "../db/pool.js";

const router = express.Router();

// Buscar itens de uma lista
router.get("/:listId", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM items WHERE list_id = $1 ORDER BY id DESC",
      [req.params.listId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar item
router.post("/:listId", async (req, res) => {
  const { name, quantity, unit } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO items (list_id, name, quantity, unit ) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.params.listId, name, quantity || 1, unit || "un"]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar item (ex: marcar comprado)
router.patch("/:id", async (req, res) => {
  const { purchased, quantity } = req.body;
  try {
    const result = await pool.query(
      "UPDATE items SET purchased = COALESCE($1, purchased), quantity = COALESCE($2, quantity) WHERE id = $3 RETURNING *",
      [purchased, quantity, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remover item
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM items WHERE id = $1", [req.params.id]);
    res.json({ message: "Item removido" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
