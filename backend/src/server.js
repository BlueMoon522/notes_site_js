import express from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/notes.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { checkUser, requireAuth } from "./middleware/authmiddleware.js";

const app = express();
//middlewares
// Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only your frontend's origin
    credentials: true, // If sending cookies or authorization headers
  })
);
app.use(express.json()); //to use req.body this is required,parses the json #middleware
app.use(cookieParser());

//routes
app.get("*", checkUser);
app.use("/api/users", userRoutes);
app.use("/api/users", noteRoutes);
app.get("http://localhost:3000/dashboard", requireAuth, (req, res) =>
  res.render("http://localhost:3000/dashboard")
);

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});
