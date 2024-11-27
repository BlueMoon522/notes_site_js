import Note from "../models/notes.model.js";
import User from "../models/users.models.js";

const notesController = {
  // Create a new note
  createNote: async (req, res) => {
    const userId = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Both title and description are required.",
      });
    }
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Could not find user",
      });
    }
    console.log(userId);

    const newNote = {
      title,
      description,
    };
    console.log(newNote);

    try {
      const user = await User.findByIdAndUpdate(userId);
      console.log("herreeeeeeeeee");
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      // Save the note
      user.notes.push(newNote);
      await user.save();

      // Add the note to the user's notes array
      // await User.findByIdAndUpdate(userId, { $push: { notes: savedNote._id } });

      res.status(201).json({
        success: true,
        data: user.notes,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  },

  //get notes by userid
  getUserNotes: async (req, res) => {
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      //accessing only titles for personal uses
      const titles = user.notes.map((note) => note.title);
      console.log(titles);
      res.status(200).json({
        success: true,
        data: user.notes,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
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
