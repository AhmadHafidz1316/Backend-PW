const { AdminModel } = require("../models");

exports.getAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findAll();

    if (admin.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data",
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    let { username, password, location } = req.body;
    const addAdmin = await AdminModel.create({
      username,
      password,
      location,
    });

    res.status(201).json({
      status: 201,
      message: "Admin Successfully created",
      data: addAdmin,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};
