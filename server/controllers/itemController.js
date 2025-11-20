import {
  getItemsByListId,
  addItem,
  updateItem,
  deleteItem,
} from "../models/itemModel.js";

export async function fetchItems(req, res) {
  try {
    const items = await getItemsByListId(req.params.listId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createItem(req, res) {
  const { name, quantity, unit } = req.body;
  try {
    const item = await addItem(
      req.params.listId,
      name,
      quantity || 1,
      unit || "un"
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function editItem(req, res) {
  const { purchased, quantity } = req.body;
  try {
    const item = await updateItem(req.params.id, purchased, quantity);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeItem(req, res) {
  try {
    await deleteItem(req.params.id);
    res.json({ message: "Item removido" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
