const messages = require('../general/responces');

const {check, validationResult} = require('express-validator');
// const {matchedData, sanitize} = require('express-validator');
const db = require("../models/index");
const author = db.author;


module.exports.validateAddAuthor = [
    //Name
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