import express from "express";
import { verifyToken } from "../middleware/authmiddleware";
const authrouter = express.Router;

authrouter.get("/verify", verifyToken);

export default authrouter;
