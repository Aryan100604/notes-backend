import User from "../models/users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const RegisterUser = async (req, res) => {
  const { username, email, fullname, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    fullname,
    password: hashedpassword,
  });
  return res.status(201).json({ message: "User Created", user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not fouund" });
  }

  const checkPassword = bcrypt.compare(password, user.password);
  if (!checkPassword) {
    res.status(403).json({ message: "Password is invalid" });
  }
  const userObj = {
    _id: user._id,
    username: user.username,
    email: user.email,
    fullname: user.fullname,
  };
  const accesstoken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });

  res.status(200).json({ message: "User logged In", accesstoken });
};

export { RegisterUser, loginUser };
