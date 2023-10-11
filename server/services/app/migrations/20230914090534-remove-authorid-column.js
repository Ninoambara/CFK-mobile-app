"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Items", "authorId");
  },

  async down(queryInterface, Sequelize) {
    
  },
};
