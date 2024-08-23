"use strict";
const { v4 } = require("uuid")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "buyer_types",
      [
        {
          id: v4(),
          name : "UMKM",
          createdAt : new Date(),
          updatedAt : new Date()
        },
        {
          id: v4(),
          name : "Rumah Tangga",
          createdAt : new Date(),
          updatedAt : new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('buyer_types', null, {});
  },
};
