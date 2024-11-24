import express from "express";
import notesController from "../controllers/notes.controller.js";

const router = express.Router();

// Define routes
router.post("/posts", notesController.createNote);
router.get("/getnotes", notesController.getAllNotes);

export default router;
