// ROUTER UTILISATEUR

// importations
const express = require('express');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

// cr�ation d'un routeur express
const router = express.Router();



// application des fonctions de gestion des utilisateurs aux diff�rentes routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/', userCtrl.getOneUser);
router.get('/users', userCtrl.getAllUsers);
router.get('/:userId/posts', userCtrl.getAllUserPosts);
router.put('/update', multer, userCtrl.updateUser);
router.delete('/delete', userCtrl.deleteUser);


// exportation du router utilisateur
module.exports = router;
