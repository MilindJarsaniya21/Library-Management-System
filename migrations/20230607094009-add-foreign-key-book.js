'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('books', {
      fields: ['libraryId'],
      type: 'foreign key',
      name: 'libraryId',
      references: {
        table: 'libraries',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('books', 'libraryId');

    await queryInterface.addConstraint('books', {
      type: Sequelize.INTEGER,
      name: 'libraryId',
    })
  }
};
