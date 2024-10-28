const { gas_stock, sale, gas_stock_history, AdminModel } = require("../models");
const { Op } = require("sequelize");
const adminmodel = require("../models/adminmodel");

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

    await gas_stock_history.create({
      stock_quantity: current_stock,
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
    const history = await gas_stock_history.findAll({
      include: [
        {
          model: AdminModel,
          as: "AdminModel",
          attributes: ["id", "username"],
        },
      ],
    });

    if (history.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Data Test",
      data: history,
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

exports.getMonthlySales = async (req, res) => {
  try {
    // Mendapatkan tanggal awal dan akhir bulan ini
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Array nama bulan
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentMonth = monthNames[now.getMonth()]; // Mendapatkan nama bulan saat ini

    // Mengambil total quantity yang terjual pada bulan ini
    const totalSales = await sale.findAll({
      attributes: [
        [
          sale.sequelize.fn("SUM", sale.sequelize.col("quantity")),
          "total_quantity_sold",
        ],
      ], // Menjumlahkan quantity
      where: {
        sale_date: {
          [Op.between]: [startOfMonth, endOfMonth], // Hanya data dalam rentang bulan ini
        },
      },
    });

    // Jika tidak ada penjualan
    if (!totalSales || totalSales[0].dataValues.total_quantity_sold === null) {
      return res.status(404).json({
        status: 404,
        message: `No sales found for the month of ${currentMonth}`,
        total_sold: 0,
        month: currentMonth,
      });
    }

    // Mengirimkan response dengan jumlah gas yang terjual
    res.status(200).json({
      status: 200,
      message: `Monthly Sales for ${currentMonth} Retrieved`,
      total_sold: totalSales[0].dataValues.total_quantity_sold,
      month: currentMonth,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
