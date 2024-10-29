const { sale, customerModel, buyer_type, sequelize } = require("../models");
const { Op } = require("sequelize");
const ExcelJS = require("exceljs");

exports.exportDailySalesToExcel = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const sales = await sale.findAll({
      where: {
        sale_date: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: [
        {
          model: customerModel,
          as: "customerModel",
          attributes: ["id", "nama"],
          include: [
            {
              model: buyer_type,
              as: "buyer_type",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (sales.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No daily sales data found" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Daily Sales");

    worksheet.columns = [
      { header: "Sale ID", key: "sale_id", width: 10 },
      { header: "Customer Name", key: "customer_name", width: 20 },
      { header: "Buyer Type", key: "buyer_type", width: 15 },
      { header: "Quantity", key: "quantity", width: 10 },
      { header: "Sale Date", key: "sale_date", width: 15 },
    ];

    sales.forEach((sale) => {
      worksheet.addRow({
        sale_id: sale.id,
        customer_name: sale.customerModel.nama,
        buyer_type: sale.customerModel.buyer_type.name,
        quantity: sale.quantity,
        sale_date: sale.sale_date,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=DailySales.xlsx"
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

exports.exportWeeklySalesToExcel = async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

    const sales = await sale.findAll({
      where: {
        sale_date: {
          [Op.between]: [startOfWeek, endOfWeek],
        },
      },
      include: [
        {
          model: customerModel,
          as: "customerModel",
          attributes: ["id", "nama"],
          include: [
            {
              model: buyer_type,
              as: "buyer_type",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (sales.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No weekly sales data found" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Weekly Sales");

    worksheet.columns = [
      { header: "Sale ID", key: "sale_id", width: 10 },
      { header: "Customer Name", key: "customer_name", width: 20 },
      { header: "Buyer Type", key: "buyer_type", width: 15 },
      { header: "Quantity", key: "quantity", width: 10 },
      { header: "Sale Date", key: "sale_date", width: 15 },
    ];

    sales.forEach((sale) => {
      worksheet.addRow({
        sale_id: sale.id,
        customer_name: sale.customerModel.nama,
        buyer_type: sale.customerModel.buyer_type.name,
        quantity: sale.quantity,
        sale_date: sale.sale_date,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=WeeklySales.xlsx"
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};

exports.exportMonthlySalesToExcel = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const sales = await sale.findAll({
      where: {
        sale_date: {
          [Op.between]: [startOfMonth, endOfMonth],
        },
      },
      include: [
        {
          model: customerModel,
          as: "customerModel",
          attributes: ["id", "nama"],
          include: [
            {
              model: buyer_type,
              as: "buyer_type",
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (sales.length === 0) {
      return res
        .status(404)
        .json({ status: 404, message: "No monthly sales data found" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Monthly Sales");

    worksheet.columns = [
      { header: "Sale ID", key: "sale_id", width: 10 },
      { header: "Customer Name", key: "customer_name", width: 20 },
      { header: "Buyer Type", key: "buyer_type", width: 15 },
      { header: "Quantity", key: "quantity", width: 10 },
      { header: "Sale Date", key: "sale_date", width: 15 },
    ];

    sales.forEach((sale) => {
      worksheet.addRow({
        sale_id: sale.id,
        customer_name: sale.customerModel.nama,
        buyer_type: sale.customerModel.buyer_type.name,
        quantity: sale.quantity,
        sale_date: sale.sale_date,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=MonthlySales.xlsx"
    );
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
  }
};
