const multer = require("multer");
// const sequelize = require('sequelize');

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads"); // cb = callback
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("user_file");

module.exports = upload;
