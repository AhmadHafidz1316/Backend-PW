"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.customerModel, {
        foreignKey: "customer_id",
        as: "customerModel",
      });
    }
  }
  sale.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      customer_id: {
        type: DataTypes.UUID,
        allowNull: false,
      } ,
      sale_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "sale",
      hooks: {
        beforeCreate: async(sales) => {
          if(!sales.sale_date) {
            sales.sale_date = new Date()
          }
        }
      }
    }
  );
  return sale;
};
