import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv?.config();

const secret = process?.env?.JWT_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token);
    if (token) {
      const decoded = jwt?.verify(token, secret);
      console?.log(decoded);
      req.body._id = decoded?.id;
    }
    next();
  } catch (error) {
    res.json({
      res: "error",
      message: "You are not authorized!",
    });
  }
};

export default authMiddleware;
