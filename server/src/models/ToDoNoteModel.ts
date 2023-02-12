import mongoose from "mongoose";

const ToDoNoteModel = new mongoose.Schema({
  note: {
    type: String,
    required: true,
    max: 250,
  },
  doneTask: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("ToDoNoteModel", ToDoNoteModel, "to_do_notes");
