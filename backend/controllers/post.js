// CONTROLLER ARTICLE

// imports

const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const db = require('../db');
const escapeString = require('../escape-string');

// fonction de création d'un article
exports.createPost = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authentification de l'utilisateur
        const userId = decodedToken.userId;
        db.query(`SELECT firstname, lastname, avatar FROM users WHERE userId = '${userId}'`, (err, row) => { // recherche des infos de l'utilisateur connecté
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Informations non trouvées !'})
            } else { // si infos de l'utilisateur trouvées
                const userInfos = row[0];
                const post = new Post({ // création d'un nouvel article
                    title: req.body.title,
                    content: req.body.content,
                    userId: decodedToken.userId,
                    firstname: userInfos.firstname,
                    lastname: userInfos.lastname,
                    avatar: userInfos.avatar
                });
                db.query(`INSERT INTO posts(title, content, userId, firstname, lastname, avatar) VALUES ('${escapeString(post.title)}', '${escapeString(post.content)}', 
                '${post.userId}', '${post.firstname}', '${post.lastname}', '${post.avatar}')`) // sauvegarde du nouvel article
                res.status(201).json({
                    message: 'Article pubié !',
                });
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de récupération d'un article
exports.getOnePost = (req, res) => {
    try {
        const postId = req.params;
        db.query(`SELECT * FROM posts WHERE postId = '${postId}'`, (err, row) => { // recherche d'un article avec son id
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Article non trouvé !'})
            } else { // si article trouvé
                const post = row;
                res.status(200).json(post); // récupération de l'article en question
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};


// fonction de récupération de tous les articles
exports.getAllPosts = (req, res) => {
    try {
        db.query(`SELECT *, DATE_FORMAT(date, "%d-%m-%Y")AS date FROM posts ORDER BY date DESC`, (err, row) => { // recherche de tous les articles, triés du plus récent au plus ancien
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Articles non trouvés !'})
            } else { // si article(s) trouvé(s)
                const post = row;
                res.status(200).json(post); // récupération de tous les articles, par ordre décroissant de date
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de suppression d'un article
exports.deletePost = (req, res) => {
    try {
        db.query(`SELECT * FROM posts WHERE postId = '${req.query.postId}'`, (err, row) => { // recherche d'un article avec son id
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Impossible de supprimer l article !'})
            } else { // si article trouvé
                db.query(`DELETE FROM posts WHERE postId = '${req.query.postId}'`); // suppression de l'article sélectionné
                res.status(200).json({message: 'Article supprimé !'})
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de like d'un article
exports.likePost = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authetification de l'utilisateur
        const userId = decodedToken.userId;
        db.query(`SELECT * FROM posts WHERE postId = '${req.query.postId}'`, (err, row) => { // recherche d'un article avec son id
            const postLikes = row[0].likes;
            const postDislikes = row[0].dislikes;
            const likes = postLikes + 1;
            const unlikes = postLikes - 1;
            const undislikes = postDislikes - 1;
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({err})
            } else { // si article trouvé
                db.query(`SELECT * FROM likes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`, (err, row) => { // recherche d'un like de l'utilisateur connecté pour l'article sélectionné
                    if (row.length === 0) { // si pas de like
                        db.query(`SELECT * FROM dislikes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`, (err, row) => { // recherche d'un dislike de l'utilisateur connecté pour l'article sélectionné
                            if (row.length === 0) { // si pas de dislike
                                db.query(`INSERT INTO likes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`); // sauvegarde du like de l'utilisateur pour l'article sélectionné
                                db.query(`UPDATE posts SET posts.likes = '${likes}' WHERE postId = '${req.query.postId}'`); // ajout du like au total des likes pour l'article sélectionné
                                res.status(200).json({message: 'L utilisateur aime cet article !'});
                            } else if (err) { // si erreur
                                res.status(401).json({err})
                            } else { // si dislike
                                db.query(`DELETE FROM dislikes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`); // suppression du dislike de l'utilisateur pour l'article sélectionné
                                db.query(`UPDATE posts SET posts.dislikes = '${undislikes}' WHERE postId = '${req.query.postId}'`); // déduction du dislike au total des dislikes pour l'article sélectionné
                                db.query(`INSERT INTO likes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`); // sauvegarde du like de l'utilisateur pour l'article sélectionné
                                db.query(`UPDATE posts SET posts.likes = '${likes}' WHERE postId = '${req.query.postId}'`);// ajout du like au total des likes pour l'article sélectionné
                                res.status(200).json({message: 'L utilisateur aime cet article !'});
                            }
                        })
                    } else if (err) { // si erreur
                        res.status(401).json({err})
                    } else { // si like
                        db.query(`DELETE FROM likes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`); // suppression du like de l'utilisateur pour l'article sélectionné
                        db.query(`UPDATE posts SET posts.likes = '${unlikes}' WHERE postId = '${req.query.postId}'`); // déduction du like de l'utilisateur pour l'article sélectionné
                        res.status(200).json({message: 'like supprimé !'})
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de récupération d'un utilisateur qui a liké un article spécifique
exports.getPostUserLike = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authentification  de l'utilisateur
        const userId = decodedToken.userId;

        db.query(`SELECT likes.userId FROM likes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`, (err, row) => { // recherche d'un like de l'utilisateur connecté pour l'article sélectionné
            if (row.length === 0) { // si pas de like
                console.log("L'utilisateur n'a pas liké cet article");
            } else if (err) { // si erreur
                return res.status(401).json({err})
            } else { // si like trouvé
                const postUserLike = row;
                res.status(200).json(postUserLike);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

// fonction de dislike d'un article
exports.dislikePost = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authentification  de l'utilisateur
        const userId = decodedToken.userId;
        db.query(`SELECT * FROM posts WHERE postId = '${req.query.postId}'`, (err, row) => { // recherche d'un article avec son id
            const postLikes = row[0].likes;
            const postDislikes = row[0].dislikes;
            const unlikes = postLikes - 1;
            const dislikes = postDislikes + 1;
            const undislikes = postDislikes - 1;
            if (err || row.length === 0) { // si aucun résultat ou erreur
                return res.status(401).json({err})
            } else { // si article trouvé
                db.query(`SELECT * FROM dislikes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`, (err, row) => { // recherche d'un dislike de l'utilisateur connecté pour l'article sélectionné
                    if (row.length === 0) { // si pas de dislike
                        db.query(`SELECT * FROM likes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`, (err, row) => { // recherche d'un like de l'utilisateur connecté pour l'article sélectionné
                            if (row.length === 0) { // si pas de like
                                db.query(`INSERT INTO dislikes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`); // sauvegarde du dislike de l'utilisateur pour l'article sélectionné
                                db.query(`UPDATE posts SET posts.dislikes = '${dislikes}' WHERE postId = '${req.query.postId}'`); // ajout du dislike au total des dislikes pour l'article sélectionné
                                return res.status(200).json({message: 'L utilisateur n aime pas cet article !'});
                            } else if (err) { // si erreur
                                return res.status(401).json({err})
                            } else { // si like
                                db.query(`DELETE FROM likes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`); // suppression du like de l'utilisateur pour l'article sélectionné
                                db.query(`UPDATE posts SET posts.likes = '${unlikes}' WHERE postId = '${req.query.postId}'`); // déduction du like du total des likes pour l'article sélectionné
                                db.query(`INSERT INTO dislikes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`); // sauvegarde du dislike de l'utilisateur pour l'article sélectionné
                                db.query(`UPDATE posts SET posts.dislikes = '${dislikes}' WHERE postId = '${req.query.postId}'`); // ajout du dislike au total des dislikes pour l'article sélectionné
                                return res.status(200).json({message: 'L utilisateur n aime pas cet article !'});
                            }
                        })
                    } else if (err) { // si erreur
                        return res.status(401).json({err})
                    } else { // si dislike
                        db.query(`DELETE FROM dislikes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`); // suppression du dislike de l'utilisateur pour l'article sélectionné
                        db.query(`UPDATE posts SET posts.dislikes = '${undislikes}' WHERE postId = '${req.query.postId}'`); // déduction du dislike du totat des dislikes pour l'article sélectionné
                        return res.status(200).json({message: 'dislike supprimé !'})
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de récupération d'un utilisateur qui a disliké un article spécifique
exports.getPostUserDislike = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authentification  de l'utilisateur
        const userId = decodedToken.userId;

        db.query(`SELECT dislikes.userId FROM dislikes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`, (err, row) => { // recherche d'un dislike de l'utilisateur connecté pour l'article sélectionné
            if (row.length === 0) { // si pas de dislike
                console.log("L'utilisateur n'a pas disliké cet article")
            } else if (err) { // si erreur
                return res.status(401).json({err})
            } else { // si dislike trouvé
                const postUserDislike = row;
                res.status(200).json(postUserDislike);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
}

// fonction de récupération des articles par ordre d'ancienneté
exports.getOldPosts = (req, res) => {
    try {
        db.query(`SELECT *, DATE_FORMAT(date, "%d-%m-%Y")AS date FROM posts ORDER BY date ASC`, (err, row) => { // recherche de tous les articles, triés du plus ancien au plus récent
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Articles non trouvés !'})
            } else { // si article(s) trouvé(s)
                const post = row;
                res.status(200).json(post); // récupération de tous les articles, par ordre croissant de date
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de récupération des articles par ordre de popularité
exports.getPopularPosts = (req, res) => {
    try {
        db.query(`SELECT *, DATE_FORMAT(date, "%d-%m-%Y")AS date FROM posts ORDER BY likes DESC`, (err, row) => { // recherche de tous les articles, triés du plus au moins populaire
            if (err || row.length === 0) { // si aucun résulat ou erreur
                res.status(401).json({message: 'Articles non trouvés !'})
            } else { // si article(s) trouvé(s)
                const post = row;
                res.status(200).json(post); // récupération de tous les articles, par ordre de popularité
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};
