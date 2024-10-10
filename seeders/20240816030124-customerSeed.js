"use strict";
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const customerId = await queryInterface.rawSelect(
      "buyer_types",
      {
        where: { name: "UMKM" },
      },
      ["id"]
    );
    await queryInterface.bulkInsert(
      "customerModels",
      [
        {
          id: v4(),
          nik: "1231234567891011",
          nama: "Salma Hayya Rahman",
          alamat: "CIAWI",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891012",
          nama: "Fajar Prasetyo",
          alamat: "CIMAHI",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891013",
          nama: "Andi Setiawan",
          alamat: "DEPOK",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891014",
          nama: "Aulia Fitriani",
          alamat: "SIDOARJO",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891015",
          nama: "Budi Santoso",
          alamat: "SLEMAN",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891016",
          nama: "Citra Lestari",
          alamat: "MALANG",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891017",
          nama: "Dewi Anggraini",
          alamat: "SEMARANG",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891018",
          nama: "Eko Saputra",
          alamat: "MEDAN",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891019",
          nama: "Fauzan Hakim",
          alamat: "PALEMBANG",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: v4(),
          nik: "1231234567891020",
          nama: "Gita Puspitasari",
          alamat: "MAKASSAR",
          buyer_type_id: customerId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("customerModels", null, {});
  },
};
