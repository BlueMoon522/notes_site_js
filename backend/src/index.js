const express = require("express");
const app = express();
const PORT = 3000;
const collection = require("./mongo");

//res-request,response-res
app.use(express.json());

// app.get("/", (req, res) => {
//   res.render("login");
// });
//
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


app.post("/register", async (req, res) => {
  const{email,password}=req.body;
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  await collection.insertMany([data]);
  console.log({ data });
  console.log(
    'Received data:',{email,password}
  );
  res.status(200).json({message:"Successful Registration"})
});


app.listen(PORT, () => {
  console.log("port connected");
});
