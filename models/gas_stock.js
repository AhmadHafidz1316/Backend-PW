'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class gas_stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AdminModel, {
        foreignKey: 'restocked_by',
        as : 'AdminModel'
      })
    }
  }
  gas_stock.init({
    stock_id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    current_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restock_date: DataTypes.DATE,
    restocked_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'gas_stock',
    hooks: {
      beforeCreate: async(gas) => {
        if(!gas.restock_date) {
          gas.restock_date = new Date()
        }
      }
    }
  });
  return gas_stock;
};