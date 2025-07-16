import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.router.js";
import noteRouter from "./routes/note.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;
const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);
mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpass}@cluster0.hoxuk.mongodb.net/notesdb`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });
