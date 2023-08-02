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
    await queryInterface.addConstraint('userBookHistories', {
      fields: ['libraryId'],
      type: 'foreign key',
      name: 'libraryIde',
      references: {
        table: 'libraries',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('userBookHistories', 'libraryId');

    await queryInterface.addColumn('userBookHistories', 'libraryId', {
      type: Sequelize.INTEGER
    })
  }
};
