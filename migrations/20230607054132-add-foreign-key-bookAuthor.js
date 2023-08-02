'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('bookAuthors', {
      fields: ['bookId'],
      type: 'foreign key',
      name: 'bookId',
      references: {
        table: 'books',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('bookAuthors', {
      fields: ['authorId'],
      type: 'foreign key',
      name: 'authorId',
      references: {
        table: 'authors',
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
    await queryInterface.removeConstraint('bookAuthors', 'bookId');
    await queryInterface.removeConstraint('bookAuthors', 'authorsId');

    await queryInterface.addConstraint('bookAuthors', {
      type: Sequelize.INTEGER,
      name: 'bookId'
    })

    await queryInterface.addConstraint('bookAuthors', {
      type: Sequelize.INTEGER,
      name: 'authorId'
    })
  }
};