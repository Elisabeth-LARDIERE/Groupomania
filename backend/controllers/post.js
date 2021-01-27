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