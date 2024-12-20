const { customerModel, buyer_type } = require("../models");

exports.getCustomer = async (req, res) => {
  try {
    const customer = await customerModel.findAll({
      include: [
        {
          model: buyer_type,
          as: 'buyer_type',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (customer.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Not found / empty data",
        data: null,
      });
    }

    // Pastikan mengganti backslash dengan slash sebelum mengirimkan path gambar
    customer.forEach((cust) => {
      if (cust.gambar) {
        cust.gambar = cust.gambar.replace(/\\/g, '/');
      }
    });

    return res.status(200).json({
      status: 200,
      message: "Data Test",
      data: customer,
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

exports.storeCustomer = async (req, res) => {
  try {
    const { nik, nama, alamat, buyer_type_id } = req.body;
    const gambar = req.files.gambar ? req.files.gambar[0].path : null;
    const fotoKtp = req.files.fotoKtp ? req.files.fotoKtp[0].path : null;

    const addCustomer = await customerModel.create({
      nik,
      nama,
      alamat,
      gambar,
      fotoKtp,
      buyer_type_id,
    });

    res.status(201).json({
      status: 201,
      message: "Customer Successfully Created",
      data: addCustomer,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};


exports.updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const [updated] = await customerModel.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedCustomer = await customerModel.findByPk(id);

      return res.status(200).json({
        status: 200,
        message: "Data Updated",
        data: updatedCustomer,
      });
    }

    return res.status(404).json({
      status: 404,
      message: "Data not found",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;

    const idCustomer= await customerModel.findByPk(id);

    if (!idCustomer) {
      return res.status(404).json({
        status: 404,
        message: "Data Not Found",
      });
    }

    await customerModel.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Data Deleted",
      data: idCustomer,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request",
      error
    })
  }
};

exports.getIdCustomer = async (req,res) => {
  try {
    const id = req.params.id
    const customer = await customerModel.findByPk(id)

    if(!customer) {
      return res.status(404).json({
        status: 404,
        message: "Data not found"
      })
    }

    return res.status(200).json({
      status: 200,
      message: "Data",
      data: customer
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      error: error
    })
  }
}

