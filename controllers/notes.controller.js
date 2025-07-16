import Notes from "../models/notes.model.js";
import User from "../models/users.model.js";

const addNote = async (req, res) => {
  const existingUser = req.user;
  if (!existingUser) {
    return res.status(400).json({ message: "User not authorized" });
  }

  const { title, description } = req.body;
  const user = await User.findById(existingUser._id);
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  const note = await Notes.create({
    createdBy: user._id,
    title,
    description,
  });
  return res.status(201).json({ message: "Note Created", note });
};

const showNotes = async (req, res) => {
  try {
    const existingUser = req.user;
    if (!existingUser) {
      return res.status(400).json({ message: "User not authorized" });
    }
    const user = await User.findById(existingUser._id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const notes = await Notes.find({ createdBy: user._id });
    res.status(200).json({ message: "User Notes", notes });
  } catch (error) {
    res.status(403).json({ message: "Error in getting the notes", error });
  }
};

const editNote = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const note = await Notes.findByIdAndUpdate(id, updateData, { new: true });
    if (!note) {
      res.staus(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note updated", note });
  } catch (error) {
    res.status(404).json({ message: "Note not found", error });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Notes.findByIdAndDelete(id);
    if (!note) {
      res.staus(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note Deleted", note });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error found in deleting the note", error });
  }
};
export { addNote, showNotes, editNote, deleteNote };
