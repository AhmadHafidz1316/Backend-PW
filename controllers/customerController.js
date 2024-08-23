const { customerModel } = require("../models");

exports.getCustomer = async (req, res) => {
  try {
    const customer = await customerModel.findAll();

    if (customer.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
