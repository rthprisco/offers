import express from "express";
import cors from "cors";
import listRoutes from "./routes/lists.js";
import itemRoutes from "./routes/items.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/lists", listRoutes);
app.use("/items", itemRoutes);

// const authenticateToken = (req, res, next) => {};

app.listen(3001, () => {
  console.log("Servidor rodando em 3001");
});
