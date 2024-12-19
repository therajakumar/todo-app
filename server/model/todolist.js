import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  task: {
    type: "String",
    require: "true",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "modeluser",
  },
});
export const todosmodel = mongoose.model("todosmodel", todoSchema);
