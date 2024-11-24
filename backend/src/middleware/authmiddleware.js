import jwt from "jsonwebtoken";
import User from "../models/users.models.js";
import dotenv from "dotenv";
dotenv.config();
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt; //jwt is the name of the cookie,viewing/grabbing it
  if (token) {
    jwt.verify(token, "process.env.SECRET_KEY", (err, decodedToken) => {
      if (err) {
        res.redirect("http://localhost:3000/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("http://localhost:3000/login");
  }
};

//check current logged in user

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "process.env.SECRET_KEY", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { requireAuth, checkUser };
