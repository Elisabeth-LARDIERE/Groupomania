// ROUTER COMMENTAIRE

// imports
const express = require('express');
const comCtrl = require('../controllers/com');
const auth = require('../middleware/auth');

// création d'un routeur express
const router = express.Router();


// application des fonctions de gestion des commentaires aux différentes routes
router.post('/create', auth, comCtrl.createCom);
router.get('/', auth, comCtrl.getAllComs);
router.delete('/:comId', auth, comCtrl.deleteCom);

// export du router article
module.exports = router;
