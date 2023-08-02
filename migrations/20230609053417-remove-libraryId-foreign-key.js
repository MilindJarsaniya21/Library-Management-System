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
    
      // Remove foreign key constraint
    // await queryInterface.removeConstraint('userBookHistories', 'libraryIde');

    await queryInterface.removeColumn('userBookHistories', 'libraryId')

    // Add new attribute with the same name and integer datatype
    await queryInterface.addColumn('userBookHistories', 'libraryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('userBookHistories', 'libraryId');

    // Add back the foreign key constraint
    await queryInterface.addConstraint('userBookHistories', {
      fields: ['libraryId'],
      type: 'foreign key',
      references: {
        table: 'library',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
      name: 'libraryIde',
    });
  }
};

