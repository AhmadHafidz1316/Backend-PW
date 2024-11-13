const {
  gas_stock,
  sale,
  customerModel,
  buyer_type,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");
const pdf = require("html-pdf");

// Fungsi untuk membuat template HTML
const generateHTML = (saleData) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sales Report</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f6f9; color: #333; }
        .container { width: 80%; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }
        .title h1 { color: #28a745; text-align: center; font-size: 2em; margin: 0; }
        h1.report-title { color: #555; text-align: center; font-size: 1.5em; margin-top: 10px; }
        .content { margin-top: 20px; line-height: 1.6; }
        .label { font-weight: bold; color: #555; }
        .content p { margin: 5px 0; }
        .content-box { background-color: #e9f5ec; padding: 15px; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="title">
          <h1>Gas Agent</h1>
        </div>
        <h1 class="report-title">Kode Pembelian: ${saleData.id}</h1>
        <div class="content content-box">
          <p><span class="label">Nama Customer:</span> ${saleData.customerModel.nama}</p>
          <p><span class="label">Jenis Pembeli:</span> ${saleData.customerModel.buyer_type.name}</p>
          <p><span class="label">Jumlah:</span> ${saleData.quantity}</p>
          <p><span class="label">Tanggal Pembelian:</span> ${new Date(saleData.sale_date).toLocaleDateString()}</p>
        </div>
        <p><span class="label">Terimakasih sudah membeli gas di agent kami !</span></p>
      </div>
    </body>
    </html>
  `;
};


exports.getSalePDF = async (req, res) => {
  try {
    const { sale_id } = req.params;

    // Ambil data penjualan berdasarkan ID
    const saleData = await sale.findOne({
      where: { id: sale_id },
      include: [
        {
          model: customerModel,
          as: "customerModel",
          attributes: ["nama"],
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

    // Jika data penjualan tidak ditemukan
    if (!saleData) {
      return res.status(404).json({
        status: 404,
        message: "Sale not found",
        data: null,
      });
    }

    // Hasilkan HTML
    const htmlContent = generateHTML(saleData);

    // Mengatur opsi untuk PDF
    const options = {
      format: 'A6', // Menggunakan ukuran A5
      border: {
        top: "10mm", // Atas
        right: "10mm", // Kanan
        bottom: "10mm", // Bawah
        left: "10mm" // Kiri
      },
      type: 'pdf', // Tipe dokumen
    };

    // Menghasilkan PDF
    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: 500,
          message: "Error generating PDF",
          error: err.message,
        });
      }

      // Mengirim PDF sebagai response
      res.setHeader("Content-Disposition", `attachment; filename="sale_${sale_id}.pdf"`);
      res.setHeader("Content-Type", "application/pdf");
      res.send(buffer);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Error generating PDF",
      error: error.message,
    });
  }
};

exports.getSale = async (req, res) => {
  try {
    const sales = await sale.findAll({
      include: [
        {
          model: customerModel,
          as: "customerModel",
          attributes: ["id","nik", "nama"],
          include: [
            {
              model: buyer_type, // Model untuk buyer type
              as: "buyer_type",
              attributes: ["name"], // Menampilkan nama dari buyer type
            },
          ],
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

// Endpoint untuk menambah penjualan tanpa menambah history di gas_stock
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

    // Mengurangi current_stock tanpa menambah history
    const updatedStock = lastGasStock.current_stock - quantity;
    await lastGasStock.update({ current_stock: updatedStock });

    // Menambahkan data penjualan
    const addSale = await sale.create({
      customer_id,
      quantity,
      sale_date: sale_date || new Date(),
    });

    res.status(201).json({
      status: 201,
      message: "Transaction Success",
      data: addSale,
      current_stock: updatedStock,
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
    const totalQuantity = await sale.sum("quantity", {
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

exports.getMonthlySalesByBuyerType = async (req, res) => {
  try {
    // Array nama bulan
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    // Array untuk menyimpan hasil penjualan tiap bulan
    const monthlySalesData = [];

    // Loop untuk mendapatkan penjualan dari Januari hingga Desember
    for (let month = 0; month < 12; month++) {
      // Tentukan tanggal awal dan akhir bulan
      const startOfMonth = new Date(new Date().getFullYear(), month, 1);
      const endOfMonth = new Date(new Date().getFullYear(), month + 1, 0);

      // Menghitung total penjualan per buyer type untuk bulan tertentu
      const salesByBuyerType = await sale.findAll({
        attributes: [
          [sequelize.fn("SUM", sequelize.col("quantity")), "total_quantity"], // Total quantity per buyer type
          "customerModel.buyer_type.name", // Ambil nama buyer type
        ],
        include: [
          {
            model: customerModel,
            as: "customerModel",
            attributes: [],
            include: [
              {
                model: buyer_type,
                as: "buyer_type",
                attributes: [],
              },
            ],
          },
        ],
        where: {
          sale_date: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
        group: ["customerModel.buyer_type.name"],
      });

      // Jika tidak ada penjualan pada bulan ini
      if (salesByBuyerType.length === 0) {
        monthlySalesData.push({
          month: monthNames[month],
          message: "No sales found for this month",
          sales: null,
        });
      } else {
        // Jika ada penjualan, tambahkan ke array dengan detail penjualan
        monthlySalesData.push({
          month: monthNames[month],
          sales: salesByBuyerType,
        });
      }
    }

    // Mengembalikan response dengan data penjualan per bulan dari Januari hingga Desember
    return res.status(200).json({
      status: 200,
      message: "Monthly sales by buyer type",
      data: monthlySalesData,
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
