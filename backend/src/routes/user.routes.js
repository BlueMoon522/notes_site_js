import express from "express";
import User from "../models/user.models.js";

import mongoose from "mongoose";
const router = express.Router();
//get info of all
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (user && user.password === password) {
      console.log("User ID:", user._id);
      // Assuming successful login
      return res.status(200).json({
        message: "Login successful!",

        userId: user._id, // Sending user ID to frontend
        name: user.name,
      });
    } else {
      // Invalid credentials
      return res.status(401).json({ message: "Invalid name or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
});

//post the user
router.post("/", async (req, res) => {
  const user = req.body;
  if (!user.name || !user.password || !user.repassword) {
    return res
      .status(400)
      .json({ sucess: false, message: "Please provide all fields" });
  }
  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ sucess: true, data: newUser });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
});

//delete a user by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      sucess: true,
      message: "User deleted",
    });
  } catch (error) {
    console.error("error:", error);
    res.status(404).json({ sucess: fasle, message: "404 not found" });
  }
});

//patch to update some field,put to update all field(not a rule more like a guideline)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ sucess: fasle, message: "404 not found" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({ sucesss: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
