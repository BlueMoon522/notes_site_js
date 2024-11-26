import User from "../models/users.models.js";
import { verifyToken } from "../middleware/authmiddleware.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const handleErrors = (error) => {
  console.log(error.message, error.code);
  let err = { email: "", password: "" };
  //handle error duplicate email for signup
  if (error.code === 11000) {
    err.email = "Email registered already";
    return err;
  }
  if (error.message === "Please Enter a name") {
    err.name = "Please enter a name";
  }
  if (error.message === "user does'not exist") {
    //login:incorrect email error;
    err.email = "Email not registered";
  }
  //login:incorrect password
  if (error.message === "Incorrect Password") {
    err.password = "Incorrect Password";
  }
  // validation errors
  if (error.message.includes("auth validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      err[properties.path] = properties.message;
    });
  }
  return err;
};
//maxAge of jwt
const maxAge = 3 * 24 * 60 * 60; //3-days in seconds

//creating a JWT tokens

const createTokens = (id) => {
  console.log("Reached here");
  return jwt.sign({ id }, "process.env.SECRET_KEY", {
    expiresIn: maxAge,
  });
};

const userController = {
  // Fetch all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    const { email, name, password } = req.body;
    try {
      const user = await User.create({ email, name, password });
      const token = createTokens(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000, //this is in milliseconds
      });
      console.log(user._id);
      res.status(200).json({ user: user._id });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
  },

  // Login a user
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createTokens(user._id);
      // console.log(token);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      // console.log(user._id);
      console.log("User logged in");
      res.status(200).json({ user: user._id, token });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ errors });
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "User deleted",
      });
    } catch (error) {
      console.error("error:", error);
      res.status(404).json({ success: false, message: "404 not found" });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "404 not found" });
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
      res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  },
  //logout
  logout_post: (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 /*Dies in 1ms */ });
    res.redirect("/");
  },

  //get all user info by id
  userInfo: async (req, res) => {
    try {
      console.log("Id was given");
      const id = req.params.id;
      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      console.log("id was found");
      const userData = user.toObject(); //changing to plain js Onject
      delete userData.password; //deleting password section from the tobe sent json
      console.log(userData);
      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Couldnot fetch the userInfo" });
    }
  },

  verifyToken: async (req, res) => {
    try {
      // Extract the token from cookies
      const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ success: false, message: "Token missing" });
      }

      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY);

      // Respond with the user ID from the token
      res.status(200).json({ success: true, uid: decoded.uid });
    } catch (error) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid or expired token" });
    }
  },
};

export default userController;
