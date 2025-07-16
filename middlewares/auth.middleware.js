import jwt from "jsonwebtoken";

const authorizeUser = async (req, res, next) => {
  const token = await req.headers.authorization.split(" ")[1];
  const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decodedtoken) {
    return res.status(404).json({ message: "User needs to login again" });
  }
  req.user = decodedtoken;
  return next();
};

export default authorizeUser;
