import express from "express";
import {
  addNote,
  showNotes,
  editNote,
  deleteNote,
} from "../controllers/notes.controller.js";
import authorizeUser from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/addNote", authorizeUser, addNote);
router.get("/showNotes", authorizeUser, showNotes);
router.patch("/editNote/:id", authorizeUser, editNote);
router.delete("/deleteNote/:id", authorizeUser, deleteNote);

export default router;
