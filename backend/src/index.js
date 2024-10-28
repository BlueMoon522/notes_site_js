const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const collection = require("./mongo");

const templatePath = path.join(__dirname, "../templates");
//res-request,response-res
app.use(express.json());
app.set("views", templatePath);
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
try {
 const check = await collection.findOne({name:req.body.name}) 
  if(check.password===req.body.password){
res.render("home")
  }
  else{
    res.send("Wrong password or Name")
  }
} catch (e) {
  res.send("Wrong Details")
}
});


app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  await collection.insertMany([data]);
  console.log({ data });

  res.render("home");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(3000, () => {
  console.log("port connected");
});
