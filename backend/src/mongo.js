const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://Nabin:mTbIDRFWzJ0MSGat@cluster0.iurryai.mongodb.net/twisty_TWISTYDB")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("Failed to connect");
  });

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("Twisty_auth", LoginSchema);

module.exports = collection;
