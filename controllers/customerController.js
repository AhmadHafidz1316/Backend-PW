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

    return res.status(200).json({
      status : 200,
      message: "Data Test",
      data : customer
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
    let {
      nik,
      nama,
      tmpt_tgl_lahir,
      jk,
      alamat,
      rt_rw,
      kel_desa,
      kecamatan,
      agama,
      status_perkawinan,
      pekerjaan,
      warga,
    } = req.body;
    const addCustomer = await customerModel.create({
      nik,
      nama,
      tmpt_tgl_lahir,
      jk,
      alamat,
      rt_rw,
      kel_desa,
      kecamatan,
      agama,
      status_perkawinan,
      pekerjaan,
      warga
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
      error
    })
  }
};

  exports.updateCustomer = async (req,res) => {
    try {
      const id = req.params.id

      const [updated] = await customerModel.update(req.body, {
        where : {id : id}
      })

      if (updated) {
        const updatedCustomer = await customerModel.findByPk(id)

        return res.status(200).json({
          status: 200,
          message: "Data Updated",
          data: updatedCustomer
        })
      }

      return res.status(404).json({
        status: 404,
        message: "Data not found"
      })

    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: "Bad Request",
        error
      })
    }
  }
