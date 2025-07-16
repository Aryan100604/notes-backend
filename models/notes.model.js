import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Note", notesSchema);
export default Notes;
