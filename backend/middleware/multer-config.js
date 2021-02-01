// MIDDLEWARE DE CONFIGURATION DE MULTER POUR LA GESTION DES FICHIERS ENTRANTS

// imports
const multer = require('multer');

// dictionnaire de mime_types
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// création d'un objet de configuration pour multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => { // dit à multer d'enregistrer les fichiers dans le dossier images
        cb(null, 'images');
    },
    filename: (req, file, cb) => { // dit à multer quel nom de fichier utiliser
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    },
    fileFilter: (req, file, cb) => { // vérification du format d'un fichier entrant
        if (MIME_TYPES) { // si format autorisé
            cb(null, true);
        } else { // si format non autorisé
            cb(null, false);
            return cb(new Error('Seuls les formats .png, .jpg and .jpeg sont autorisés!'));
        }
    }
});

// export du middleware multer configuré
module.exports = multer({storage: storage}).single('image');
