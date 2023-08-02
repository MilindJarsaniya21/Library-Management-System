const messages = require('../general/responces');

const {check, validationResult} = require('express-validator');
// const {matchedData, sanitize} = require('express-validator');
const db = require("../models/index");
const user = db.user;


module.exports.validateAddUser = [
    //Name
    check('uName')
        .custom(async (uName, { req }) => {
        const isUsernameTaken = await user.findOne({where: {uName: uName}});
  
        if (isUsernameTaken) {
          throw new Error('Username already in use');
        }
  
        return true; // Return true if the validation passes
      })
    .trim().notEmpty().withMessage("Username cannot be empty.")
    .isLength({min: 3}).withMessage("Username must have minimum 3 characters."),

    // Email
    check('uEmail')
    .isEmail().withMessage("Invalid Email address")
    .custom(async (uEmail, {req}) => {
        const isEmailTaken = await user.findOne({where: {uEmail: uEmail}});
        
        if(isEmailTaken) {
            throw new Error('Email is alreay in use');
        }
        
        return true;
    })
    .notEmpty().withMessage("Email cannot be empty"),

    // Phone number
    check('uPhone')
    .not().isNumeric().withMessage("Only numbers are allowed in phone number")
    .custom(async (uPhone, {req}) => {
        const isPhoneTaken = await user.findOne({where: {uPhone: uPhone}});

        if(isPhoneTaken){
            throw new Error('Phone number is already taken');
        }

        return true;
    })
    .isLength({min: 10}).withMessage("Phone number must be of 10 numbers")
    .isLength({max: 10}).withMessage("Phone number must be of 10 numbers")
    .notEmpty().withMessage("Phone number cannot be empty"),
    

    // Address
    check('uAddress')
    .notEmpty().withMessage("Address is required")
    // .isLength({max: 25}).withMessage("Adrdess can't be more than of 25 characters")
    .optional().isIn(['Ahmedabad','Surat','Vadodara','Rajkot']).withMessage("Please select from Ahmedabad, Surat, Vadodara or Rajkot only"),

    //Password
    check('uPassword')
    .notEmpty().withMessage("Password is required")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>]{8,}$/)
    .withMessage('Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.'),
];  

module.exports.checkValidationResult =  (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(400).json(result.array());
    }
    else{
        next();
    }
}