// ROUTER COMMENTAIRE

// importations
const express = require('express');

// création d'un routeur express
const router = express.Router();


// application des fonctions de gestion des commentaires aux différentes routes
router.post('/create', comCtrl.createCom);
router.get('/', comCtrl.getAllComs);
router.get('/:comId', comCtrl.getOneCom);
router.delete('/:comId', comCtrl.deleteCom);


// exportation du router article
module.exports = router;
