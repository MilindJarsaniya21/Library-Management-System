const {check, validationResult} = require('express-validator');
const db = require("../models/index");
const responces = require('../general/responces');
const userbookhistory = db.userbookhistory;

module.exports.validateAddIssue = [
    // User Id
    check('userId')
    .trim().notEmpty().withMessage("User Id is required")
    .isInt().withMessage("Only integer allowed in userId"),

    check('bookIde')
    .trim().notEmpty().withMessage("Book Id is required")
    .isInt().withMessage("Only integer allowed in bookId"),

    check('libraryId')
    .trim().notEmpty().withMessage("Library Id is required")
    .isInt().withMessage("Only integer allowed in libraryId"),

    check('assignedDate')
    .trim().notEmpty().withMessage("Assigned date is requried")
    .isDate().withMessage("Only dates are allowed as assignedDate"),

    check('dueDate')
    .trim().notEmpty().withMessage("Due date is required")
    .isDate().withMessage("Only dates are allowed as dueDate"),

    check('returnDate')
    .isDate().withMessage("Only dates are allowed as returnDate")
];

module.exports.validationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).json(result.array());
    }
    else{
        next();
    }
}