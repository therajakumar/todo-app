import { Router } from "express";
import { getUserDetails, login, register } from "../Controllers/register.js";
import { protect } from "../midleware/authMidlewar.js";

const authrouter = Router();
authrouter.route("/").post(register);
authrouter.route("/login").post(login);
authrouter.route("/").get(protect, getUserDetails);
export default authrouter;
