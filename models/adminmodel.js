"use strict";
const { Model } = require("sequelize");
const Bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class AdminModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.gas_stock_history, {
        foreignKey: 'restocked_by',
        as: 'gas_stock_histories'
      });
    }
  }
  AdminModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username Already Exist",
        },
        validate: {
          notNull: {
            msg: "Username Field Is Empty",
          },
        },
      },
      password: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
        notNull: {
          msg : "Password Field Is Empty"
        },
        len : {
          args : [6,17],
          msg: "Password must be between 6 and 10 characters long"
        }
       }
      } ,
      location: {
        type : DataTypes.STRING,
        unique: true,
        allowNull: false,
        unique: {
          args : true,
          msg: "Location Already Exist"
        },
        validate: {
          notNull: {
            msg : "Location Field Is Empty"
          }
        }
      } 
    },
    {
      sequelize,
      modelName: "AdminModel",
      hooks :{
        beforeCreate : async(adminmodel) => {
          if (adminmodel.password){
            const salt = await Bcrypt.genSaltSync(10)
            adminmodel.password = Bcrypt.hashSync(adminmodel.password, salt)
          }
        }
      }
    }
  );
  AdminModel.prototype.CorrectPassword = async (reqPassword, passwordDB) => {
    return await Bcrypt.compareSync(reqPassword,passwordDB)
  }
  return AdminModel;
};
