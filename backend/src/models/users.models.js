// users.model.js

import mongoose from "mongoose";
import Note from "./notes.model.js";

import isEmail from "validator/lib/isEmail.js";
import bcrypt from "bcrypt";

// Define the User schema

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter an Email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter an valid email"],
    },

    name: {
      type: String,
      required: [true, "Please Enter a name"],
    },

    password: {
      type: String,
      required: [true, "Please enter a password"],
      unique: true,
      minlength: [8, "Please have at least minimum length of 8"],
    },

    // Array of ObjectId references to Note documents

    notes: [{ title: String, description: String }],
  },

  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  },
);

//presaving the password to the db use bcrypt(depreciated,change to other encryptions later) to encrypt passwords
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("User does not exist");
};

// Create and export the User model

const Users = mongoose.model("User", userSchema);

export default Users;
