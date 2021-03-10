// CONTROLLER UTILISATEUR

// imports
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const User = require('../models/User');
const db = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fs = require('fs');


// création d'un modèle de mot de passe
const passwordSchema = new passwordValidator();

// conditions requises pour le mot de passe
passwordSchema
    .is().min(8) // longueur minimum
    .is().max(60) // longueur maximum
    .has().uppercase()  // contient au moins une majuscule
    .has().lowercase() // contient au moins une minuscule
    .has().digits() // contient au moins un chiffre
    .has().not().spaces() // ne contient pas d'espace


// fonction d'inscription d'un nouvel utilisateur
exports.signup = async (req, res) => {
    try {
        if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) { // si l'adresse mail ou le mot de passe est invalide
            res.status(401).json({
                message: 'Veuillez vérifier l adresse mail et le mot de passe. Le mot de passe doit contenir entre ' +
                    '8 et 60 caractères sans espace, et inclure au moins une majuscule, une minuscule et un chiffre'
            })
        } else if (emailValidator.validate(req.body.email) && passwordSchema.validate(req.body.password)) { // si l'adresse mail et le mot de passe sont valides
            if (req.body.email === process.env.emailAdmin && req.body.password === process.env.passwordAdmin) {
                const hash = await bcrypt.hash(req.body.password, 10); // hachage du mot de passe
                const user = new User({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash,
                    admin: "1"
                });
                db.query(`INSERT INTO users(firstname, lastname, email, password, admin) VALUES(?, ?, ?, ?, ?)`, // sauvegarde du nouvel utilisateur
                    [user.firstname, user.lastname, user.email, user.password, user.admin])
                res.status(201).json({user, message: "Compte créé !"})
            } else {
                const hash = await bcrypt.hash(req.body.password, 10); // hachage du mot de passe
                const user = new User({ // création d'un nouvel utilisateur avec mot de passe crypté
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: hash
                });
                db.query(`INSERT INTO users(firstname, lastname, email, password) VALUES(?, ?, ?, ?)`, // sauvegarde du nouvel utilisateur
                    [user.firstname, user.lastname, user.email, user.password])
                res.status(201).json({user, message: "Compte créé !"})
            }
        }
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de connexion d'un utilisateur
exports.login = (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE email = ?`, req.body.email, (err, row) => { // vérification de la présence de l'utilisateur dans la bd
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Utilisateur non trouvé !'})
            } else { // si utlisateur trouvé
                const user = row[0];
                bcrypt.compare((req.body.password), user.password, (err, data) => { // comparaison du mdp et du hash
                        if (!data) { // s'ils ne correspondent pas
                            res.status(401).json({message: 'Mot de passe incorrect !'})
                        } else { // s'ils correspondent
                            const newToken = jwt.sign( // encodage d'un nouveau token
                                {userId: user.userId},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn: '24h'}
                            )
                            res.status(200).json({ // connexion de l'utilisateur
                                userId: user.userId,
                                token: newToken,
                                message: 'Utilisateur connecté'
                            });
                        }
                    }
                )
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de récupération d'un utilisateur
exports.getOneUser = (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE userId = ?`, req.query.userId, (err, row) => { // vérification de la présence de l'utilisateur dans la bdd
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Utilisateur non trouvé !'})
            } else { // si utilisataur trouvé
                const user = row[0];
                res.status(200).json(user); // récupération de l'utilisateur
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de modification d'un utilisateur
exports.updateUser = (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE userId = ?`, req.query.userId, (err, row) => { // vérification de la présence de l'utilisateur dans la bdd
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Impossible de modifier le profil !'})
            } else { // si utilisateur trouvé
                const user = row[0];
                if (req.file) {
                    const path = user.avatar;
                    const filename = path.split('/')[1];
                    if (filename !== 'avatar-default.png') {
                        fs.unlink(`images/${filename}`, (err) => {
                            if (err) throw err;
                        })
                    }
                }
                const userUpdated = req.file ? { // création du profil modifié, si modification de l'avatar
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    avatar: `images/${req.file.filename}`
                } : { // création du profil modifié, si pas de modification de l'avatar
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email
                }

                let query = `UPDATE users SET `;
                let updated = false;
                if (userUpdated.email !== user.email) { // si email modifié
                    query += `email = '${userUpdated.email}'`
                    updated = true;
                }
                if (userUpdated.firstname !== user.firstname) { // si modification du prénom
                    if (updated) {
                        query += `, `;
                    }
                    query += `firstname = '${userUpdated.firstname}'`
                    updated = true;
                }
                if (userUpdated.lastname !== user.lastname) { // si modification du nom de famille
                    if (updated) {
                        query += `, `;
                    }
                    query += `lastname = '${userUpdated.lastname}'`
                    updated = true;
                }
                if (userUpdated.avatar != null) { // si modification de l'avatar
                    if (updated) {
                        query += `, `;
                    }
                    query += `avatar = '${userUpdated.avatar}'`
                    updated = true;
                }
                if (updated) { // si au moins un paramètre modifié
                    db.query(query + `WHERE userId = ?`, req.query.userId); // mise à jour du profil utilisateur
                    res.status(200).json({firstname: userUpdated.firstname, lastname: userUpdated.lastname, email: userUpdated.email, avatar: userUpdated.avatar ? userUpdated.avatar : user.avatar, message: "Profil modifié !"}); // avec avatar modifié ou non
                } else { // si aucun paramètre modifié
                    res.status(204).json(); // réponse de non-modification
                }
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de suppression d'un utlisateur
exports.deleteUser = (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE userId = ?`, req.query.userId, (err, row) => { // vérification de la présence de l'utilisateur dans la bdd
            if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Impossible de supprimer le compte !'});
            } else { // si utilisateur trouvé
                const user = row;
                db.query(`SELECT postId, COUNT(*)AS totalComs FROM coms WHERE userId = ? GROUP BY
                          postId`, req.query.userId, (err, row) => { // recherche du nombre de commentaires laissés par l'utilisateur, et sur quels articles
                        if (err || row.length === 0) { // si pas de résultat ou erreur
                            console.log('pas de commentaires publiés');
                        } else { // si résultat
                            for (let i of row) { // pour chaque paire clé/valeur obtenue...
                                const comsPostId = i.postId; // ... création d'une constante pour chaque valeur : id de l'article et total de coms associé
                                const comsTotalComs = i.totalComs;
                                db.query(`SELECT * FROM posts WHERE postId = ?`, comsPostId, (err, row) => { // ... recherche de tous les articles avec les id obtenus
                                        if (err || row.length === 0) { // si aucun résultat ou erreur
                                        } else { // si article(s) trouvé(s)
                                            const totalComs = row[0].totalComs;
                                            const newTotal = totalComs - comsTotalComs;
                                            db.query(`UPDATE posts SET posts.totalComs = ? WHERE postId = ?`, [newTotal, comsPostId]); // mise à jour du nombre total de commentaires pour chacun des articles sélectionnés
                                        }
                                    }
                                )
                            }
                        }
                    }
                )

                db.query(`SELECT * FROM likes WHERE userId = ? GROUP BY postId`, req.query.postId, (err, row) => { // recherche des likes laissés par l'utilisateur, et sur quels articles
                    if (err || row.length === 0) { // si aucun résultat ou erreur
                        console.log('pas de likes publiés');
                    } else { // si like(s) trouvé(s)
                        for (let i of row) { // pour chaque paire clé/valeur obtenue...
                            const likesPostId = i.postId; // ... création d'une constante pour chaque valeur : id de l'article et total de likes associé,
                            db.query(`SELECT * FROM posts WHERE postId = ?`, likesPostId, (err, row) => { // ... recherche de tous les articles avec les id obtenus
                                if (err || row.length === 0) { // si aucun résultat ou erreur
                                } else { // si article(s) trouvé(s)
                                    const totalLikes = row[0].likes;
                                    const newTotal = totalLikes - 1;
                                    db.query(`UPDATE posts SET posts.likes = ? WHERE postId = ?`, [newTotal, likesPostId]); // mise à jour du nombre total de likes pour chacun des articles sélectionnés
                                }
                            })
                        }
                    }
                })

                db.query(`SELECT * FROM dislikes WHERE userId = ? GROUP BY postId`, req.query.userId, (err, row) => { // recherche des dislikes laissés par l'utilisateur, et sur quels articles
                    if (err || row.length === 0) { // si aucun résultat ou erreur
                        console.log('pas de dislikes publiés');
                    } else { // si dislike(s) trouvé(s)
                        for (let i of row) { // pour chaque paire clé/valeur obtenue...
                            const dislikesPostId = i.postId; // ... création d'une constante pour chaque valeur : id de l'article et total de dislikes associé,
                            db.query(`SELECT * FROM posts WHERE postId = ?`, dislikesPostId, (err, row) => { // ... recherche de tous les articles avec les id obtenus
                                if (err || row.length === 0) { // si aucun résultat ou erreur
                                } else { // si article(s) trouvé(s)
                                    const totalDislikes = row[0].dislikes;
                                    const newTotal = totalDislikes - 1;
                                    db.query(`UPDATE posts SET posts.dislikes = ? WHERE postId = ?`, [newTotal, dislikesPostId]); // mise à jour du nombre total de dislikes pour chacun des articles sélectionnés
                                }
                            })
                        }
                    }
                })

                db.query(`DELETE FROM users WHERE userId = ?`, req.query.userId) // suppression de l'utilisateur
                res.status(200).json({message: 'Compte supprimé !'});

                const path = user[0].avatar;
                const filename = path.split('/')[1];
                if (filename !== 'avatar-default.png') { // suppression de l'ancien avatar du fichier "images", sauf si l'ancien avatar est celui par défaut
                    fs.unlink(`images/${filename}`, (err) => {
                        if (err) throw err;
                    });
                }
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// fonction de récupération de tous les articles d'un utilisateur
exports.getAllUserPosts = (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authentification utilisateur
        const userId = decodedToken.userId;
            db.query(`SELECT * FROM posts WHERE userId = ?`, userId, (err, row) => { // recherche de tous les articles créés par l'utilsateur
                if (err || row.length === 0) { // si aucun résultat ou erreur
                res.status(401).json({message: 'Articles non trouvés !'})
            } else { // si article(s) trouvé(s)
                const post = row;
                res.status(200).json(post); // récupération de tous les articles
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};
