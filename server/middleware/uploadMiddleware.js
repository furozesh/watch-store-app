const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null , "uploads/")
    },
    filename: function(req, file, cb) {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        )
    },
});
const fileFilter = (req , file , cb) => {
    const allowedTypes = /jpg|jpeg|png|webp/;
    const extanme  = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(
        file.mimetype
    );
    if(extanme && mimetype) {
        cb(null , true)
    } else {
        cb("only Image allowed.")
    }
}

const upload = multer({
    storage,
    fileFilter,
})

module.exports = upload
