const {check, validationResult} = require("express-validator");
const db = require("../models/index");
const { messages } = require("../general/responces");
const responces = require("../general/responces");
const library = db.library;

module.exports.validateAddLibrary = [
    // Library Name
    check('lName')
    .custom(async (lName, {req}) => {
        const isLibraryNameTaken = await library.findOne({where: {lName: lName}});
        if(isLibraryNameTaken){
            throw new Error('Libraryname is already in use.')
        }

        return true;
    })
    .trim().notEmpty().withMessage("Libraryname is required."),

    // Library Assist
    check('lAssist')
    .trim().notEmpty().withMessage("Assistant name is required."),

    check('lAddress')
    .trim().notEmpty().withMessage("Library Address is required.")
];

module.exports.validationResult = (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        res.status(responces.HTTP_STATUS_CODES.BAD_REQUEST).josn(result.array());
    }
    else{
        next();
    }
}