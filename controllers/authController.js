require("dotenv").config();
const { AdminModel } = require("../models");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};``


exports.RegisterAdmin = async (req, res) => {
  try {
    // if (!req.body.passwordConfirm) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: ["Password Confirmation Empty"],
    //   });
    // }

    // if (req.body.password != req.body.passwordConfirm) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: ["Invalid Password Confirmation"],
    //   });
    // }

    const newAdmin = await AdminModel.create({
      username: req.body.username,
      password: req.body.password,
      location: req.body.location,
    });

    const token = signToken(newAdmin._id);

    return res.status(201).json({
      status: 201,
      message: "New Admin Has Created",
      data: newAdmin,
      token: token,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      status: 400,
      message: "Error Validation",
      error: error,
    });
  }
};

exports.Login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      status: 400,
      message: ["Your Username or Password is Empty "],
    });
  }

  const userData = await AdminModel.findOne({
    where: { username: req.body.username },
  });

  if (
    !userData ||
    !(await userData.CorrectPassword(req.body.password, userData.password))
  ) {
    return res.status(400).json({
      status: 400,
      message: ["Invalid Username or Password"]
    })
  }

  const token = signToken(userData._id);

  return res.status(200).json({
    status: 201,
    message: "Successfully Login",
    data: userData,
    token: token,
  });
};
