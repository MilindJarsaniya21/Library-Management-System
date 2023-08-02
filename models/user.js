"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //Library - User (Many to Many)
      // models.library.belongsToMany(user, {
      //   through: "userbookhistory",
      // });
      // user.belongsToMany(models.library, {
      //   through: "userbookhistory",
      // });

      // //User - Book (Many to Many)
      // user.belongsToMany(models.book, {
      //   through: "userBookHistories",
      // });
      // models.book.belongsToMany(user, {
      //   through: "userBookHistories",
      // });

      //user - userbookhistory (One to Many)
      // user.hasMany(models.userBookHistory, {
      //   foreignKey: "userId",
      // });
      // models.userBookHistory.belongsTo(user);
      // models.user.hasMany(models.userBookHistory, {
      //   foreignKey: "userId",
      // });
    }
  }
  user.init(
    {
      uName: DataTypes.STRING,
      uEmail: DataTypes.STRING,
      uPhone: DataTypes.INTEGER,
      uAddress: DataTypes.STRING,
      userProfilePic: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
