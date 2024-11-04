import { mongoose } from "mongoose";

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Note = mongoose.model("Note", postsSchema);
export default Note;
