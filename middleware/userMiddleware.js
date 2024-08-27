require("dotenv").config()
const jwt = require("jsonwebtoken")
const { AdminModel} = require("../models")

exports.authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      res.status(401).json({
        status: 401,
        message: "Authorization Undifined",
      })
    );
  }

  let decoded;
  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(
      res.status(401).json({
        error: error,
        message: "Undifined Token",
      })
    );
  }

  next();
};