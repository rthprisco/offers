import {
  getAllLists,
  createList,
  deleteList
} from "../models/listModel.js";

export async function fetchLists(req, res) {
  try {
    const lists = await getAllLists();
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function addList(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "nome é obrigatório" });
  }

  try {
    const newList = await createList(name);
    res.json(newList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeList(req, res) {
  try {
    await deleteList(req.params.id);
    res.json({ message: "Lista excluída com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
