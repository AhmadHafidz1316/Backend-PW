const { gas_stock, sale, customerModel } = require("../models");
const { Op } = require("sequelize");

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

    // Mengecek apakah customer ada
    const customerExists = await customerModel.findByPk(customer_id); 
    if (!customerExists) {
      return res.status(404).json({
        status: 404,
        message: "Customer not found",
      });
    }

    // Mendapatkan stok gas terakhir
    const lastGasStock = await gas_stock.findOne({
      order: [["createdAt", "DESC"]],
    });

    // Jika stok tidak mencukupi
    if (!lastGasStock || lastGasStock.current_stock < quantity) {
      return res.status(400).json({
        status: 400,
        message: "Not enough gas stock available",
      });
    }

    // Mengurangi current_stock dengan jumlah quantity yang dijual
    const updatedStock = lastGasStock.current_stock - quantity;
    await lastGasStock.update({ current_stock: updatedStock });

    // Menambahkan data penjualan
    const addSale = await sale.create({
      customer_id: customer_id,
      quantity: quantity,
      sale_date: sale_date || new Date(),
    });

    res.status(201).json({
      status: 201,
      message: "Transaction Success",
      data: addSale,
      current_stock: updatedStock, // Mengembalikan stok terkini setelah transaksi
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

exports.getDailySales = async (req, res) => {
  try {
    // Mendapatkan tanggal hari ini
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Menghitung total quantity penjualan untuk hari ini
    const totalQuantity = await sale.sum('quantity', {
      where: {
        sale_date: {
          [Op.between]: [startOfDay, endOfDay], // Filter berdasarkan tanggal hari ini
        },
      },
    });

    // Jika tidak ada penjualan hari ini
    if (!totalQuantity) {
      return res.status(404).json({
        status: 404,
        message: "No sales found for today",
        data: 0, // Mengembalikan 0 jika tidak ada penjualan
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Total quantity of daily sales",
      total_quantity: totalQuantity, // Mengembalikan total quantity
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