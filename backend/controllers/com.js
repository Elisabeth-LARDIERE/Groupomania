// CONTROLLER COMMENTAIRE

// importations
const jwt = require('jsonwebtoken');
const Com = require('../models/Com');
const db = require('../db');
const escapeString = require('../escape-string');


// exportation de la fonction de création d'un commentaire
exports.createCom = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token
        const userId = decodedToken.userId;
        db.query(`SELECT firstname, lastname, avatar FROM users WHERE userId = '${userId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Informations non trouvées !'})
            } else {
                const userInfos = row[0];
                const com = new Com({
                    content: req.body.content,
                    userId: userId,
                    postId: req.body.postId,
                    firstname: userInfos.firstname,
                    lastname: userInfos.lastname,
                    avatar: userInfos.avatar,
                });
                db.query(`INSERT INTO coms(content, userId, postId, firstname, lastname, avatar) VALUES ('${escapeString(com.content)}', '${com.userId}', '${com.postId}', '${com.firstname}', '${com.lastname}', '${com.avatar}')`);
                db.query(`SELECT totalComs from posts WHERE postId = '${com.postId}'`, (err, row) => {
                    if (err || row.length === 0) {
                        res.status(401).json({err})
                    } else {
                        const totalComs = row[0].totalComs;
                        const newTotalComs = totalComs + 1;
                        db.query(`UPDATE posts SET posts.totalComs = '${newTotalComs}' WHERE postId = '${com.postId}'`);
                        res.status(201).json({
                            message: 'Commentaire publié !'
                        });
                    }
                })

            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de récupération d'un commentaire
exports.getOneCom = (req, res) => {
    try {
        const {comId} = req.params;
        db.query(`SELECT * FROM posts WHERE comId = '${comId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Commentaire non trouvé !'})
            } else {
                const com = row[0];
                res.status(200).json(com);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};


// exportation de la fonction de récupération de tous les commentaires d'un article
exports.getAllComs = (req, res) => {
    try {
        const postId = req.query.postId;
        db.query(`SELECT * FROM coms WHERE postId = '${postId}'`, (err, row) => {
            if (err) {
                res.status(401).json({message: 'Impossible de charger les commentaires !'})
            } else {
                const com = row;
                res.status(200).json(com);
            }

        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de suppression d'un commentaire
exports.deleteCom = (req, res) => {
    try {
        const {comId} = req.params;
        db.query(`SELECT * FROM com WHERE comId = '${comId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Impossible de supprimer le commentaire !'})
            } else {
                db.query(`DELETE FROM coms WHERE comId = '${comId}'`);
                res.status(200).json({message: 'Commentaire supprimé !'})
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};


