// CONTROLLER COMMENTAIRE

// imports
const jwt = require('jsonwebtoken');
const Com = require('../models/Com');
const db = require('../db');

// fonction de création d'un commentaire
exports.createCom = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authetification de l'utilisateur
        const userId = decodedToken.userId;
        db.query(`SELECT firstname, lastname, avatar FROM users WHERE userId = ?`, userId, (err, row) => { // recherche des infos de l'utilisateur connecté
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Informations non trouvées !'})
            } else { // si infos de l'utilisateur trouvées
                const userInfos = row[0];
                const com = new Com({ // création d'un nouveau commentaire
                    content: req.body.content,
                    userId: userId,
                    postId: req.body.postId,
                    firstname: userInfos.firstname,
                    lastname: userInfos.lastname,
                    avatar: userInfos.avatar,
                });
                db.query(`INSERT INTO coms(content, userId, postId, firstname, lastname, avatar)VALUES(?, ?, ?, ?, ?, ?
                          )`,
                    [com.content, com.userId, com.postId, com.firstname, com.lastname, com.avatar]); // sauvegarde du nouveau commentaire
                db.query(`SELECT totalComs from posts WHERE postId = ?`, com.postId, (err, row) => { // recherche du nombre de commentaires pour l'article sélectionné
                    if (err || row.length === 0) { // si aucun résultat ou erreur
                        res.status(401).json({err})
                    } else { // si commentaire(s) trouvé(s)
                        const totalComs = row[0].totalComs;
                        const newTotalComs = totalComs + 1; // ajout du commentaire créé au nombre total de commentaires
                        db.query(`UPDATE posts SET posts.totalComs = ? WHERE postId = ?`, [newTotalComs, com.postId]); // sauvegarde du nouveau total de commentaires
                        res.status(201).json({
                            com,
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

// fonction de récupération de tous les commentaires d'un article
exports.getAllComs = (req, res) => {
    try {

        const postId = req.query.postId;
        db.query(`SELECT * FROM coms WHERE postId = ?`, postId, (err, row) => { // recherche des commentaires d'un article avec son id
            if (err) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Impossible de charger les commentaires !'})
            } else { // si commentaire(s) trouvé(s)
                const com = row;
                res.status(200).json(com); //récupération de tous les commentaires de l'article
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de suppression d'un commentaire
exports.deleteCom = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authetification de l'utilisateur
        const userId = decodedToken.userId;
        db.query(`SELECT admin FROM users WHERE userId = ?`, userId, (err, row) => { // recherche du statut de l'utilisateur connecté
                if (err || row.length === 0) { // si aucun résultat ou erreur
                    res.status(401).json({message: 'Informations non trouvées !'})
                } else {
                    const admin = row[0].admin;
                    if (admin === 1) { // si l'utilisateur connecté est le modérateur
                        db.query(`SELECT * FROM coms WHERE comId = ?`, req.query.comId, (err, row) => { // recherche d'un commentaire avec son id
                            if (err || row.length === 0) { // si aucun résultat ou erreur
                                res.status(401).json({message: 'Impossible de supprimer le commentaire !'})
                            } else { // si commentaire trouvé
                                const postId = row[0].postId
                                db.query(`SELECT posts.totalComs FROM posts WHERE postId = ?`, postId, (err, row) => {
                                    const totalComs = row[0].totalComs;
                                    const newTotalComs = totalComs - 1;
                                    db.query(`UPDATE posts SET posts.totalComs = ? WHERE postId = ?`, [newTotalComs, postId]); // sauvegarde du nouveau total de commentaires
                                })
                                db.query(`DELETE FROM coms WHERE comId = ?`, req.query.comId); // suppression du commentaire sélectionné
                                res.status(200).json({message: 'Commentaire supprimé !'})
                            }
                        })
                    } else { // si l'utilisateur connecté n'est pas le modérateur
                        res.status(401).json({message: 'Impossible de supprimer le commentaire !'})
                    }
                }
            }
        )
    } catch (error) {
        res.status(500).json({error})
    }
};
