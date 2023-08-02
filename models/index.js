'use strict';

const validator = require('express-validator');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.author = require('./author')(sequelize, Sequelize.DataTypes);
db.book = require('./book')(sequelize, Sequelize.DataTypes);
db.bookAuthor = require('./bookAuthor')(sequelize, Sequelize.DataTypes);
db.library = require('./library')(sequelize, Sequelize.DataTypes);
db.user = require('./user')(sequelize, Sequelize.DataTypes);
db.userbookhistory = require('./userBookHistory')(sequelize, Sequelize.DataTypes);


//Library - Book (One to Many)
db.book.belongsTo(db.library,{foreignKey:"libraryId"});
db.library.hasMany(db.book,{foreignKey:"libraryId"});

// BookAuthor - Book, Author
db.bookAuthor.belongsTo(db.book,{foreignKey:"bookId"})
db.bookAuthor.belongsTo(db.author,{foreignKey:"authorId"})
db.book.hasMany(db.bookAuthor,{foreignKey:"bookId"})
db.author.hasMany(db.bookAuthor,{foreignKey:"authorId"})

//UserBookHistory - Book & User (Many to Many)
db.userbookhistory.belongsTo(db.book, { foreignKey: 'bookIde' });
db.book.hasMany(db.userbookhistory,{foreignKey:"bookIde"});
db.userbookhistory.belongsTo(db.user, { foreignKey: 'userId' });
db.user.hasMany(db.userbookhistory,{foreignKey:"userId"});


module.exports = db;
