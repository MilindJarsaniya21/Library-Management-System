const { check, validationResult } = require('express-validator');


exports.checkuser = [

//name
     check('uName')
     .notEmpty().withMessage('name cannot be an empty')
    .isAlpha().withMessage('All the charecters of name must be alphabates')
    .isLength({ min: 5 })
    .withMessage('name must be at least 5 characters'),

//mobile number
     check('uPhone')
    .notEmpty().withMessage('mobile number cannot be an empty')
    .isLength({ min: 10 })
    .isLength({ max: 10 })
    .withMessage('mobile number must be at least 10 digits'),

//email
     check('uEmail')
    .exists().withMessage('already exists')
    .notEmpty().withMessage('email cannot be an empty')
    .isEmail().withMessage('Invalid email address')
    .isLength({min:15}),
    //.withMessage('email must be at least 15 characters'),

//password
      check('password')
     .isStrongPassword({
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: false,
          pointsPerUnique: 1,
          pointsPerRepeat: 0.5,
          pointsForContainingLower: 10,
          pointsForContainingUpper: 10,
          pointsForContainingNumber: 10,
          pointsForContainingSymbol: 10,
     }).withMessage("good password")
    .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number")
    .notEmpty().withMessage('password cannot be an empty'),

    //.withMessage('password cannot be empty')
    //.isLength({min:10})
    //.withMessage('password must be at least 10 characters'),

//address
     check('uAddress')
    .notEmpty().withMessage('address cannot be an empty')
    .isLength({min:5})
    .withMessage('address must be at least 10 characters')
       
];

exports.checkerror = (req,res,next) => {
    const errors = validationResult(req);
    //console.log(errors);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
}