import express from "express";
import userController from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/authmiddleware.js";

const router = express.Router();
// Define routes
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.get("/:id", userController.userInfo);
router.get("/verifytoken", verifyToken, userController.verifyToken);

export default router;
