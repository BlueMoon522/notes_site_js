import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";

// Define routes
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.get("/:id", userController.userInfo);

export default router;
