require("dotenv").config();
const jwt = require("jsonwebtoken");
const { AdminModel } = require("../models");

exports.authMiddleware = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Authorization Token Undefined',
    });
  }

  console.log('Received Token:', token);

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(401).json({
      status: 401,
      message: 'Invalid Token',
    });
  }

  try {
    const user = await AdminModel.findByPk(decoded.id);
    console.log('User Found:', user);
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'User not found',
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error retrieving user',
    });
  }
};
