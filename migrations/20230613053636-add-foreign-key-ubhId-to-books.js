'use strict';

const { query } = require('express');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn('books', 'ubhId', {
    //   type: Sequelize.INTEGER,
    //   allowNull: true
    // })

    // await queryInterface.addConstraint('books', {
    //   fields: ['ubhId'],
    //   type: 'foreign key',
    //   name: 'ubhId',
    //   references: {
    //     table: 'userBookHistories',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // await queryInterface.removeConstraint('books', 'ubhId');

    // await queryInterface.removeColumn('books', 'ubhId');
  }
};
