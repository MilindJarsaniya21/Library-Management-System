'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class library extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Library - Book (One to Many)
      // library.hasMany(models.book, {
      //   foreignKey: 'libraryId'
      // });
      // models.book.belongsTo(library);

      // //Library - User (Many to Many)
      // library.belongsToMany(models.user, {
      //   through: 'userbookhistory'
      // })
      // library.belongsToMany(models.user, {
      //   through: 'userbookhistory'
      // })
    }
  }
  library.init({
    lName: DataTypes.STRING,
    lAssist: DataTypes.STRING,
    lAddress: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'library',
  });
  return library;
};