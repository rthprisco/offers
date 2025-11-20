import express from "express";
import {
  fetchLists,
  addList,
  removeList
} from "../controllers/listController.js";

const router = express.Router();

router.get("/", fetchLists);     
router.post("/", addList);       
router.delete("/:id", removeList); 

export default router;
