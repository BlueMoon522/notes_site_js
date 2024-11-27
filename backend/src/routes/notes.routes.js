import express from "express";
import notesController from "../controllers/notes.controller.js";

const router = express.Router();

// Define routes
router.post("/:id/posts", notesController.createNote);
router.get("/getnotes", notesController.getAllNotes);
router.get("/:id/usernotes", notesController.getUserNotes);
export default router;
