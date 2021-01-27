// ROUTER ARTICLE

// importations
const express = require('express');

// création d'un routeur express
const router = express.Router();


// application des fonctions de gestion des articles aux différentes routes
router.post('/create', postCtrl.createPost);
router.get('/', postCtrl.getAllPosts);
router.get('/popular', postCtrl.getPopularPosts);
router.get('/old', postCtrl.getOldPosts);
router.get('/:postId', postCtrl.getOnePost);
router.delete('/delete', postCtrl.deletePost);
router.put('/updateLike', postCtrl.likePost);
router.put('/updateDislike', postCtrl.dislikePost);


// exportation du router article
module.exports = router;
