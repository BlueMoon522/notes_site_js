import Note from "../models/notes.model.js";
import User from "../models/notes.model.js";

const notesController = {
  // Create a new note
  createNote: async (req, res) => {
    const { title, description, userId } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Both title and description are required.",
      });
    }

    const newNote = new Note({
      title,
      description,
      user: userId, // Assuming you associate the note with a user
    });

    try {
      // Save the note
      const savedNote = await newNote.save();

      // Add the note to the user's notes array
      await User.findByIdAndUpdate(userId, { $push: { notes: savedNote._id } });

      res.status(201).json({
        success: true,
        data: savedNote,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  // Get all notes
  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.find({});
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
};

export default notesController;
