const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    },
    fileFilter: (req, file, cb) => {
        if (MIME_TYPES) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Seuls les formats .png, .jpg and .jpeg sont autorisés!'));
        }
    }
});


module.exports = multer({storage: storage}).single('image');
