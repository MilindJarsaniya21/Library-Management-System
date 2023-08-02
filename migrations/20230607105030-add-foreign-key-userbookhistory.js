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
      fields: ['userId'],
      type: 'foreign key',
      name: 'userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('userBookHistories', {
      fields: ['bookIde'],
      type: 'foreign key',
      name: 'bookIde',
      references: {
        table: 'books',
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
    await queryInterface.removeConstraint('userBookHistories', 'userId');
    await queryInterface.removeConstraint('userBookHistories', 'bookIde');

    await queryInterface.addConstraint('userBookHistories', {
      type: Sequelize.INTEGER,
      name: 'userId'
    })

    await queryInterface.addConstraint('userBookHistories', {
      type: Sequelize.INTEGER,
      name: 'bookIde'
    })
  }
};
