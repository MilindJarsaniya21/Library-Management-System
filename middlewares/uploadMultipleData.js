const multer = require("multer");

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, cb){
            cb(null,"uploads")
        },
        filename: function(req, file, cb){
            cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
        }
    })
}).array("user_files", 2);

module.exports = upload;