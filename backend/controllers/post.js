// CONTROLLER ARTICLE

// importations

const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const db = require('../db');
const escapeString = require('../escape-string');

// exportation de la fonction de création d'un article
exports.createPost = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token
        const userId = decodedToken.userId;
        db.query(`SELECT firstname, lastname, avatar FROM users WHERE userId = '${userId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Informations non trouvées !'})
            } else {
                const userInfos = row[0];
                const post = new Post({
                    title: req.body.title,
                    content: req.body.content,
                    userId: decodedToken.userId,
                    firstname: userInfos.firstname,
                    lastname: userInfos.lastname,
                    avatar: userInfos.avatar
                });
                db.query(`INSERT INTO posts(title, content, userId, firstname, lastname, avatar) VALUES ('${escapeString(post.title)}', '${escapeString(post.content)}', '${post.userId}', '${post.firstname}', '${post.lastname}', '${post.avatar}')`)
                res.status(201).json({
                    message: 'Article pubié !',
                });
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de récupération d'un article
exports.getOnePost = (req, res) => {
    try {
        const postId = req.params;
        db.query(`SELECT * FROM posts WHERE postId = '${postId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Article non trouvé !'})
            } else {
                const post = row;
                res.status(200).json(post);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};


// exportation de la fonction de récupération de tous les articles
exports.getAllPosts = (req, res) => {
    try {
        db.query(`SELECT *, DATE_FORMAT(date, "%d-%m-%Y") AS date FROM posts ORDER BY date DESC`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Articles non trouvés !'})
            } else {
                const post = row;
                res.status(200).json(post);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de suppression d'un article
exports.deletePost = (req, res) => {
    try {
        db.query(`SELECT * FROM posts WHERE postId = '${req.query.postId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Impossible de supprimer l article !'})
            } else {
                db.query(`DELETE FROM posts WHERE postId = '${req.query.postId}'`);
                res.status(200).json({message: 'Article supprimé !'})
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

//exportation de la fonction de like d'un article
exports.likePost = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token
        const userId = decodedToken.userId;
        db.query(`SELECT * FROM posts WHERE postId = '${req.query.postId}'`,  (err, row) => {
            const postLikes = row[0].likes;
            const postDislikes = row[0].dislikes;
            const likes = postLikes + 1;
            const unlikes = postLikes - 1;
            const undislikes = postDislikes - 1;
            if (err || row.length === 0) {
                res.status(401).json({err})
            } else {
                db.query(`SELECT * FROM likes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`,  (err, row) => {
                    if (err || row.length === 0) {
                        db.query(`SELECT * FROM dislikes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`,  (err, row) => {
                            if (err || row.length === 0) {
                                db.query(`INSERT INTO likes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`);
                                db.query(`UPDATE posts SET posts.likes = '${likes}' WHERE postId = '${req.query.postId}'`);
                                res.status(200).json({message: 'L utilisateur aime cet article !'});
                            } else {
                                db.query(`DELETE FROM dislikes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`);
                                db.query(`UPDATE posts SET posts.dislikes = '${undislikes}' WHERE postId = '${req.query.postId}'`);
                                db.query(`INSERT INTO likes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`);
                                db.query(`UPDATE posts SET posts.likes = '${likes}' WHERE postId = '${req.query.postId}'`);
                                res.status(200).json({message: 'L utilisateur aime cet article !'});
                            }
                        })
                    } else {
                        db.query(`DELETE FROM likes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`);
                        db.query(`UPDATE posts SET posts.likes = '${unlikes}' WHERE postId = '${req.query.postId}'`);
                        res.status(200).json({message: 'like supprimé !'})
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

//exportation de la fonction de like d'un article
exports.dislikePost = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token
        const userId = decodedToken.userId;
        db.query(`SELECT * FROM posts WHERE postId = '${req.query.postId}'`,  (err, row) => {
            const postLikes = row[0].likes;
            const postDislikes = row[0].dislikes;
            const unlikes = postLikes - 1;
            const dislikes = postDislikes + 1;
            const undislikes = postDislikes - 1;
            if (err || row.length === 0) {
                return res.status(401).json({err})
            } else {
                db.query(`SELECT * FROM dislikes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`,  (err, row) => {
                    if (row.length === 0) {
                        db.query(`SELECT * FROM likes WHERE userId = '${userId}' AND postId = '${req.query.postId}'`,  (err, row) => {
                            if (row.length === 0) {
                                db.query(`INSERT INTO dislikes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`);
                                db.query(`UPDATE posts SET posts.dislikes = '${dislikes}' WHERE postId = '${req.query.postId}'`);
                                return res.status(200).json({message: 'L utilisateur n aime pas cet article !'});
                            } else {
                                db.query(`DELETE FROM likes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`);
                                db.query(`UPDATE posts SET posts.likes = '${unlikes}' WHERE postId = '${req.query.postId}'`);
                                db.query(`INSERT INTO dislikes(userId, postId) VALUES ('${userId}', '${req.query.postId}')`);
                                db.query(`UPDATE posts SET posts.dislikes = '${dislikes}' WHERE postId = '${req.query.postId}'`);
                                return res.status(200).json({message: 'L utilisateur n aime pas cet article !'});
                            }
                        })
                    } else {
                        db.query(`DELETE FROM dislikes WHERE postId = '${req.query.postId}' AND userId = '${userId}'`);
                        db.query(`UPDATE posts SET posts.dislikes = '${undislikes}' WHERE postId = '${req.query.postId}'`);
                        return res.status(200).json({message: 'dislike supprimé !'})
                    }
                })
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de récupération des articles par ordre d'ancienneté
exports.getOldPosts = (req, res) => {
    try {
        db.query(`SELECT *, DATE_FORMAT(date, "%d-%m-%Y") AS date FROM posts ORDER BY date ASC`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Articles non trouvés !'})
            } else {
                const post = row;
                res.status(200).json(post);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de récupération des articles par ordre de popularité
exports.getPopularPosts = (req, res) => {
    try {
        db.query(`SELECT *, DATE_FORMAT(date, "%d-%m-%Y") AS date FROM posts ORDER BY likes DESC`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Articles non trouvés !'})
            } else {
                const post = row;
                res.status(200).json(post);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

