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
