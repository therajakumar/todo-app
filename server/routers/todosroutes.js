import { Router } from "express";
import { addTodo, alltodos, deleteTodo, update } from "../Controllers/todolist.js";
import { protect } from "../midleware/authMidlewar.js";
const todoroutes = Router();

todoroutes.route("/add").post(protect,addTodo);
todoroutes.route("/get").get(protect,alltodos);
todoroutes.route("/update").put(protect,update);
todoroutes.route("/delete/:id").delete(protect,deleteTodo)
export default todoroutes;
