'use strict';
const {
  Model
} = require('sequelize');
const userbookhistory = require('./userBookHistory');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Library - Book (One to Many)
      // models.library.hasMany(book, {
      //   foreignKey: 'libraryId'
      // });
      // book.belongsTo(models.library);

      // //Book - Author (Many to Many)
      // models.author.belongsToMany(book, {
      //   through: 'bookAuthors'
      // })
      // book.belongsToMany(models.author, {
      //   through: 'bookAuthors'
      // })

      // //User - Book (Many to Many)
      // models.user.belongsToMany(book, {
      //   through: 'userBookHistories'
      // });
      // book.belongsToMany(models.user, {
      //   through: 'userBookHistories'
      // });
    }
  }
  book.init({
    bName: DataTypes.STRING,
    bType: DataTypes.STRING,
    libraryId: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};