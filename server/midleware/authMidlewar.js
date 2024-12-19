import jwt from "jsonwebtoken";
import { modeluser } from "../model/usermodel.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await modeluser.findById(decoded._id).select("-password");

      if (!user) {
        throw new Error("User not found");
      }

      req.user = user;
      // console.log(token)
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});
