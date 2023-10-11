"use strict";
const { items, categories, ingredients } = require("../db.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const item = items.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const category = categories.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const ingredient = ingredients.map((e) => ({
      ...e,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Categories",category, {});
    await queryInterface.bulkInsert("Items",item, {});
    await queryInterface.bulkInsert("Ingredients",ingredient, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Ingredients', null, {});
    await queryInterface.bulkDelete('Items', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
