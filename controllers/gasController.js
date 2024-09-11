const { gas_stock, AdminModel } = require("../models");

exports.addGas = async (req, res) => {
  try {
    const { current_stock, restock_date } = req.body;

    const lastGasStock = await gas_stock.findOne({
      order: [["createdAt", "DESC"]],
    });

    let updated_stock = current_stock;
    if (lastGasStock) {
      updated_stock = lastGasStock.current_stock + current_stock;
    }
    const newGasStock = await gas_stock.create({
      current_stock: updated_stock,
      restock_date: restock_date || new Date(),
      restocked_by: req.user.id,
    });

    res.status(201).json({
      status: 201,
      message: "New Gas Stock Created",
      data: newGasStock,
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      status: 400,
      message: "Error Creating Gas Stock",
      error: error.message,
    });
  }
};

exports.history = async (req, res) => {
  try {
    const gas = await gas_stock.findAll({
      include: [
        {
          model: AdminModel,
          as: 'AdminModel',
          attributes: ['id','username']
        }
      ]
    });

    if (gas.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data",
      data: gas,
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

exports.getLastStock = async (req, res) => {
  try {
    const lastGasStock = await gas_stock.findOne({
      order: [["createdAt", "DESC"]], // Mengambil entri terbaru berdasarkan waktu pembuatan
    });

    if (!lastGasStock) {
      return res.status(404).json({
        status: 404,
        message: "No stock found",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Latest Gas Stock Retrieved",
      data: {
        current_stock: lastGasStock.current_stock,
        restock_date: lastGasStock.restock_date,
        restocked_by: lastGasStock.restocked_by,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
