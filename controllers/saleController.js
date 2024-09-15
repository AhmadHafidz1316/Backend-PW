const { sale, customerModel } = require("../models");

exports.getSale = async (req, res) => {
  try {
    const sales = await sale.findAll({
      include: [
        {
          model: customerModel,
          as: "customerModel",
          attributes: ["id", "nama", "buyer_type_id"],
        },
      ],
    });

    if (sales.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Sale",
      data: sales,
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

exports.storeSale = async (req, res) => {
  try {
    let { customer_id, sale_date, quantity } = req.body;
    const addSale = await sale.create({
      customer_id: customer_id,
      quantity: quantity,
      sale_date: sale_date || new Date(),
    });

    res.status(201).json({
      status: 201,
      message: "Transaction Success",
      data: addSale,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: "Error Creating Sale",
      error: error.message,
    });
  }
};
