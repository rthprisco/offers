import pool from "../db/pool.js";

export async function getItemsByListId(listId) {
  const result = await pool.query(
    "SELECT * FROM items WHERE list_id = $1 ORDER BY id DESC",
    [listId]
  );
  return result.rows;
}

export async function addItem(listId, name, quantity, unit) {
  const result = await pool.query(
    "INSERT INTO items (list_id, name, quantity, unit) VALUES ($1, $2, $3, $4) RETURNING *",
    [listId, name, quantity, unit]
  );
  return result.rows[0];
}

export async function updateItem(id, purchased, quantity) {
  const result = await pool.query(
    `
    UPDATE items
    SET purchased = COALESCE($1, purchased),
        quantity = COALESCE($2, quantity)
    WHERE id = $3
    RETURNING *
    `,
    [purchased, quantity, id]
  );
  return result.rows[0];
}

export async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}
