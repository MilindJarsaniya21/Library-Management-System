module.exports = (app) => {
  const lmsController = require("../controllers/lmsController.js");
  const libraryController = require("../controllers/libraryController.js");
  const bookController = require("../controllers/bookController.js");
  const authorController = require("../controllers/authorController.js");
  const userController = require("../controllers/userController.js");
  const bookissuing = require("../controllers/bookIssuing.js");
  const userValidator = require("../middlewares/userValidator.js");
  const authorValidator = require("../middlewares/authorValidator.js");
  const bookValidator = require("../middlewares/bookValidator.js");
  const libraryValidator = require("../middlewares/libraryValidator.js");
  const bookIssueValidator = require("../middlewares/bookIssueValidator.js");
  const upload = require("../middlewares/uploadData.js");
  const uploadMultipleData = require("../middlewares/uploadMultipleData.js");

var router = require("express").Router();

// SAPARATE

//LIBRARY
// create library - Registeration
router.post("/reglib", libraryValidator.validateAddLibrary, libraryValidator.validationResult, libraryController.reglib);
// Retrieve library - using libId
router.get("/retlibid/:libId", libraryController.retlibid)
// Retrieve library - ALL
router.get("/retliball", libraryController.retliball)
// update library
router.put("/updatelib/:libId", libraryController.updatelib)
// delete library - libId
router.delete("/deletelibid/:libId", libraryController.deletelibid)
// delete library - ALL
router.delete("/deleteliball", libraryController.deleteliball)

// BOOK
// Create book
router.post("/regbook", bookValidator.validateAddBook, bookValidator.checkValidationResult, bookController.regbook)
// Retrieve Book - bookId
router.get("/retbookid/:bookId", bookController.retbookid);
// Retrieve Book - ALL
router.get("/retbookall", bookController.retbookall);
// Update books
router.put("/updatebook/:bookId", bookController.updatebook);
// Delete books - bookId
router.delete("/deletebookid/:bookId", bookController.deletebookid);
// Delete books - ALL
router.delete("/deletebookall", bookController.deletebookall);

// AUTHOR
// Create Author
router.post("/regauthor", authorValidator.validateAddAuthor, authorValidator.checkValidationResult, authorController.regauthor)
// Retrieve Author - authId
router.get("/retauthorid/:authId", authorController.retauthorid);
// Retrieve Author - ALL
router.get("/retauthorall", authorController.retauthorall);
// Update author
router.put("/updateauthor/:authId", authorController.updateauthor);
// Delete author - authId
router.delete("/deleteauthorid/:authId", authorController.deleteauthorid);
// Delete author - ALL
router.delete("/deleteauthorall", authorController.deleteauthorall);

// USER
// Create user
router.post("/reguser", userValidator.validateAddUser, userValidator.checkValidationResult, userController.reguser)
// Retrieve User - authId
router.get("/retuserid/:userId", userController.retuserid);
// Retrieve User - ALL
router.get("/retuserall", userController.retuserall);
// Update user
router.post("/updateuser/:userId", userController.updateuser);
// Delete user - userId
router.delete("/deleteuserid/:userId", userController.deleteuserid);
// Delete user - ALL
router.delete("/deleteuserall", userController.deleteuserall);
// Upload data
router.post("/upload/:userId", upload, userController.upload);
// Delete data
router.delete("/deleteData/:filename", userController.deleteData);
// Upload Multiple data
router.post("/uploadMultipleData/:userId", uploadMultipleData, userController.uploadMultipleData);
// delete Multiple Data
router.delete("/deleteMultipleData/:userId", userController.deleteMultipleData);

// Issue Book
router.post("/bookissue", bookIssueValidator.validateAddIssue, bookIssueValidator.validationResult, bookissuing.bookissue);
// Show all data
router.get("/ubhdataall",bookissuing.ubhdataall);
// Show buh data by Id
router.get("/ubhdataid/:userId",bookissuing.ubhdataid);
// Delete ubh data - Id
router.delete("/deleteubhid/:userId",bookissuing.deleteubhid);
// Delete ubh data - ALL
router.delete("/deleteubhall",bookissuing.deleteubhid);

  app.use("/api/lmsController", router);
};