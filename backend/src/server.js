import express from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/notes.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { checkUser } from "./middleware/authmiddleware.js";

dotenv.config();

const app = express();
//middlewares
// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only your frontend's origin
    credentials: true, // If sending cookies or authorization headers
  }),
);
app.use(express.json()); //to use req.body this is required,parses the json #middleware
app.use(cookieParser());

//routes
app.get("*", checkUser);
app.use("/api/users", userRoutes);
app.use("/api/users", noteRoutes);
app.post("/decode-cookie", (req, res) => {
  console.log("What the actual fuck1");
  const token = req.cookies.jwt; // Read the jwt cookie
  if (!token) {
    console.log("What the actual fuck2");
    return res.status(400).json({ error: "Cookie not found" });
  }
  console.log(token);
  console.log("What the actual fuck3");
  try {
    console.log("What the actual fuck4.1");
    const decoded = jwt.verify(token, "process.env.SECRET_KEY");
    console.log("What the actual fuck4");
    return res.json({ id: decoded.id });
  } catch (err) {
    console.log("What the actual fuck5");
    console.log(err);
    return res.status(401).json({ error: "Invalid token" });
  }
});
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
