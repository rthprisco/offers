import express from "express";
import {
  fetchItems,
  createItem,
  editItem,
  removeItem,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/:listId", fetchItems);
router.post("/:listId", createItem);
router.patch("/:id", editItem);
router.delete("/:id", removeItem);

export default router;
