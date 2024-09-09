const { gas_stock } = require('../models');

exports.createGasStock = async (req, res) => {
  try {
    const { current_stock, restock_date } = req.body;

    // Pastikan req.user.id sudah tersedia setelah autentikasi
    const newGasStock = await gas_stock.create({
      current_stock: current_stock,
      restock_date: restock_date || new Date(),
      restocked_by: req.user.id  // Mengisi dengan ID pengguna yang sedang login
    });

    res.status(201).json({
      status: 201,
      message: 'New Gas Stock Created',
      data: newGasStock
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      status: 400,
      message: 'Error Creating Gas Stock',
      error: error.message
    });
  }
};
