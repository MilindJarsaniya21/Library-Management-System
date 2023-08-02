'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userBookHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // models.user.hasMany(userBookHistory, {
      //   foreignKey: "userId",
      // });
      // userBookHistory.belongsTo(models.user);
      // models.userBookHistory.belongsTo(models.user, {
      //   foreignKey: "userId",
      // });
    }
  }
  userBookHistory.init({
    userId: DataTypes.INTEGER,
    bookIde: DataTypes.INTEGER, // bookIde
    libraryId: DataTypes.INTEGER,
    assignedDate: DataTypes.DATE,
    dueDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'userBookHistory',
  });
  return userBookHistory;
};