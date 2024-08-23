"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("customerModels", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nik: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tmpt_tgl_lahir: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jk: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rt_rw: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kel_desa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kecamatan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status_perkawinan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pekerjaan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      warga: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      buyer_type_id: {
        type: Sequelize.UUID,
        references: {
          model: "buyer_types",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("customerModels");
  },
};
