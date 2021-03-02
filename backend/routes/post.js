// ROUTER ARTICLE

// imports
const express = require('express');
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

// création d'un routeur express
const router = express.Router();


// application des fonctions de gestion des articles aux différentes routes
router.post('/create', auth, postCtrl.createPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/popular', auth, postCtrl.getPopularPosts);
router.get('/old', auth, postCtrl.getOldPosts);
router.get('/:postId', auth, postCtrl.getOnePost);
router.delete('/delete', auth, postCtrl.deletePost);
router.put('/like', auth, postCtrl.likePost);
router.put('/dislike', auth, postCtrl.dislikePost);
router.get('/:postId/userLike', auth, postCtrl.getPostUserLike);
router.get('/:postId/userDislike', auth, postCtrl.getPostUserDislike);

// export du router article
module.exports = router;
