import express from "express";
import dotenv from "dotenv";
import authrouter from "./routers/userroutes.js";
import connection from "./db/db.js";
import { todosmodel } from "./model/todolist.js";
import todoroutes from "./routers/todosroutes.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
connection();

app.use(express.json());

app.use("/user", authrouter);
app.use("/todos", todoroutes);
app.get("/", (req, res) => {
  res.send("sever is ready");
});
const PORT=process.env.PORT||3000;

app.listen(PORT, () => {
  console.log(`Server is running on port",http://localhost:${PORT}`);
});
