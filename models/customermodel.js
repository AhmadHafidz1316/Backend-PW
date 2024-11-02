"use strict";
const { Model, where } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customerModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.buyer_type, {
        foreignKey: 'buyer_type_id',
        as: 'buyer_type',
      });
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
      alamat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Alamat Field Is Empty",
          },
        },
      },
      gambar : {
        type : DataTypes.STRING,
        allowNull : true,
      },
      buyer_type_id: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "customerModel",
      hooks : {
        beforeCreate: async(customer) => {
          if(!customer.buyer_type_id) {
            const buyerType = await sequelize.models.buyer_type.findOne({where : {name : 'UMKM'}})
            customer.buyer_type_id = buyerType.id
          }
        }
      }
    }
  );
  return customerModel;
};
