const { buyer_type } = require("../models");

exports.getBuyer = async (req, res) => {
  try {
    const buyer = await buyer_type.findAll();
    if (buyer.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Buyer Type",
      data: buyer,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error,
    });
  }
};
