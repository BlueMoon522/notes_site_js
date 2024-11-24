import User from "../models/users.models.js";
import dotenv from "dotenv";
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
  return JsonWebTokenError.sign({ id }, "process.env.SECRET_KEY", {
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
      res.send(200).json({ user: user._id });
    } catch (error) {
      const errors = handleErrors(error);
      res.status(400).json({ error });
    }
  },

  // Login a user
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(200).json({ user: user._id });
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
};

export default userController;
