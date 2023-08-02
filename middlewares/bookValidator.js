const {check, validationResult} = require("express-validator");
const db = require("../models/index");
const book = db.book;
const author = db.author;

module.exports.validateAddBook = [
    // Book name
    check('bName')
        .custom(async (bName, { req }) => {
        const isBooknameTaken = await book.findOne({where: {bName: bName}});
  
        if (isBooknameTaken) {
          throw new Error('Bookname already in use');
        }
  
        return true; // Return true if the validation passes
      })
    .trim().notEmpty().withMessage("Bookname cannot be empty.")
    .isLength({min: 3}).withMessage("Bookname must have minimum 3 characters."),

    // Book type
    check('bType')
    .trim().notEmpty().withMessage("Book type is required"),

    // Name
    check('aName')
    .trim().notEmpty().withMessage("Authorname cannot be empty.")
    .isLength({min: 3}).withMessage("Authorname must have minimum 3 characters."),

    // Email
    check('aEmail')
    .isEmail().withMessage("Invalid Email address")
    .notEmpty().withMessage("Email cannot be empty")
]

module.exports.checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(400).json(result.array());
    }
    else{
        next();
    }
}