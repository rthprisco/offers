import pool from "../db/pool.js";

export async function getAllLists() {
  const result = await pool.query(
    "SELECT * FROM lists ORDER BY id DESC"
  );
  return result.rows;
}

export async function createList(name) {
  const result = await pool.query(
    "INSERT INTO lists (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
}

export async function deleteList(id) {
  await pool.query(
    "DELETE FROM lists WHERE id = $1",
    [id]
  );
}
