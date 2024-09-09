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
    }
  }
  gas_stock.init({
    current_stock: DataTypes.INTEGER,
    restock_date: DataTypes.DATE,
    restocked_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'gas_stock',
  });
  return gas_stock;
};