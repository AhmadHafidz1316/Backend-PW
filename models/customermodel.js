"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customerModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customerModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nik: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        unique: {
          args: true,
          msg: "NIK Already Exist",
        },
        validate: {
          notNull: {
            msg: "NIK Field Is Empty",
          },
          len: {
            args: 16,
            msg: "NIK Must Have 16 Digit",
          },
        },
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nama Field Is Empty",
          },
        },
      },
      tmpt_tgl_lahir: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tempat Tanggal Lahir Is Empty",
          },
        },
      },
      jk: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Jenis Kelamin Field Is Empty",
          },
        },
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Alamat Field Is Empty",
          },
        },
      },
      rt_rw: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "RT/RW Field Is Empty",
          },
        },
      },
      kel_desa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kelurahan/Desa Field Is Empty",
          },
        },
      },
      kecamatan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kecamatan Field Is Empty",
          },
        },
      },
      agama: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Agama Field Is Empty",
          },
        },
      },
      status_perkawinan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status Perkawinan Field Is Empty",
          },
        },
      },
      pekerjaan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pekerjaan Field Is Empty",
          },
        },
      },
      warga: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Warga Field Is Empty",
          },
        },
      },
      buyer_type_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "customerModel",
    }
  );
  return customerModel;
};
