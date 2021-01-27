// CONTROLLER UTILISATEUR

// importations

const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const User = require('../models/User');
const db = require('../db');
const escapeString = require('../escape-string');
const jwt = require('jsonwebtoken');

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


// exportation de la fonction d'inscription d'un nouvel utilisateur
exports.signup = async (req, res) => {
    try {

        // si l'adresse mail ou le mot de passe est invalide
        if (!emailValidator.validate(req.body.email) || !passwordSchema.validate(req.body.password)) {
            res.status(401).json({
                message: 'Veuillez vérifier l adresse mail et le mot de passe. Le mot de passe doit contenir entre ' +
                    '8 et 60 caractères sans espace, et inclure au moins une majuscule, une minuscule et un chiffre'
            })

            // si l'adresse mail et le mot de passe sont valides
        } else if (emailValidator.validate(req.body.email) && passwordSchema.validate(req.body.password)) {

            //********** si l'adresse mail existe déjà dans la bdd et/ou que la combinaison nom/prénom est déjà utilisée **********//


            //********** si tout est ok **********//
            const hash = await bcrypt.hash(req.body.password, 10) // hachage du mot de passe

            // création et enregistrement d'un nouvel utilisateur dans la bdd avec mot de passe crypté
            const user = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });

            db.query(`INSERT INTO users(firstname, lastname, email, password) VALUES('${escapeString(user.firstname)}', '${escapeString(user.lastname)}', '${user.email}', '${user.password}')`)
            res.status(201).json(user)
        }
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de connexion d'un utilisateur
exports.login = (req, res) => {
    try {

        // vérification de la présence de l'utilisateur dans la bdd
        db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Utilisateur non trouvé !'})
            } else {
                const user = row[0];
                bcrypt.compare((req.body.password), user.password, (err, data) => {
                        // si utilisateur trouvé, comparaison mdp et hash
                        if (!data) {
                            res.status(401).json({message: 'Mot de passe incorrect !'})
                        } else {
                            const newToken = jwt.sign(
                                {userId: user.userId},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn: '24h'}
                            )
                            res.status(200).json({ // si mdp ok, encodage d'un nouveau token
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

// exportation de la fonction de récupération d'un utilisateur

exports.getOneUser = (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE userId = '${req.query.userId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Utilisateur non trouvé !'})
            } else {
                const user = row[0];
                res.status(200).json(user);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de récupération de tous les utilisateurs

exports.getAllUsers = (req, res) => {
    try {
        db.query(`SELECT * FROM users ORDER BY lastname`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Auteurs non trouvés!'})
            } else {
                const authors = row;
                res.status(200).json(authors);
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de modification d'un utilisateur

exports.updateUser = (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE userId = '${req.query.userId}'`, (err, row) => {
            if (err || row.length === 0) {
                res.status(401).json({message: 'Impossible de modifier le profil !'})
            } else {
                const user = row[0];
                const userUpdated = req.file ? {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    avatar: `images/${req.file.filename}`
                } : {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email
                }

                let query = `UPDATE users SET `;
                let updated = false;
                if (userUpdated.email !== user.email) {
                    query += `email = '${userUpdated.email}'`
                    updated = true;
                }
                if (userUpdated.firstname !== user.firstname) {
                    if (updated) {
                        query += `, `;
                    }
                    query += `firstname = '${userUpdated.firstname}'`
                    updated = true;
                }
                if (userUpdated.lastname !== user.lastname) {
                    if (updated) {
                        query += `, `;
                    }
                    query += `lastname = '${userUpdated.lastname}'`
                    updated = true;
                }
                if (userUpdated.avatar != null) {
                    if (updated) {
                        query += `, `;
                    }
                    query += `avatar = '${userUpdated.avatar}'`
                    updated = true;
                }

                if (updated) {
                    db.query(query + `WHERE userId = '${req.query.userId}'`);
                    res.status(200).json({avatar: userUpdated.avatar ? userUpdated.avatar : user.avatar});
                } else {
                    res.status(204).json();
                }
            }
        })

    } catch (error) {
        res.status(500).json({error})
    }
};

// exportation de la fonction de suppression d'un utlisateur
/*let queryPromise = async function (sql, values) {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
           resolve();
       }, 100)
    });
}

queryPromise('1', {}).then((row) => {
    lsllsl
}).catch((err) => {
    res.status(401).json({message: 'Impossible de supprimer le compte !'}); // si on le trouve pas : message d'impossibilité de suppression
});
queryPromise('2')
    .then(() => {
        return queryPromise('3')
    })
    .then(() => {
        return queryPromise('4').catch(() => {

        })
    })
    .then(() => {
        // tout cest bien passer
    }).catch(() => {
        // ouille
})
Promise.all([queryPromise(), queryPromise()]).then(() => {

})
sdhfskj*/

/*db.query().then(() => {
    sdfsd
}).then(() => {
    sdf
})
let promise = Promise.resolve();
for(let i = jhsj) {
    promise = promise.then(() => {
        return db.query1()
    }).then((dfs) => {

    })
}
promise.then(() => {
    // tout qui est fini
})*/

// db.query(`SELECT * FROM users WHERE userId = '${req.query.userId}'`).then((row) => {
//     if (row.length === 0) {
//         res.status(401).json({message: 'Impossible de supprimer le compte !'}); // si on le trouve pas : message d'impossibilité de suppression
//     }  else {
//         db.query(`SELECT postId, COUNT(*) AS totalComs FROM coms WHERE userId = '${req.query.userId}' GROUP BY postId`, (err, row) => { //on cherche le nombre de commentaires laissés par l'utilisateur, et sur quels articles
//                 if (err || row.length === 0) { // si pas de résultats : erreur
//                     console.log('pas de commentaires publiés');
//                 } else { // si résultats
//                     console.log(1);
//                     for (let i of row) { // pour chaque paire clé/valeur obtenue...
//                         const comsPostId = i.postId; // ... on crée une constante pour chaque valeur : id de l'article et total de coms associé,
//                         console.log(2);
//                         const comsTotalComs = i.totalComs;
//                         console.log(3);
//                         db.query(`SELECT * FROM posts WHERE postId = '${comsPostId}'`, (err, row) => { // ... on cherche dans la table articles tous les articles avec les id obtenus
//                                 if (err || row.length === 0) {
//                                     console.log('chou');
//                                 } else {
//                                     const totalComs = row[0].totalComs;
//                                     console.log(4);
//                                     const newTotal = totalComs - comsTotalComs;
//                                     console.log(5);
//                                     db.query(`UPDATE posts SET posts.totalComs = '${newTotal}' WHERE postId = '${comsPostId}'`); // on met à jour le total des coms pour chacun de ces articles.
//                                     console.log(6);
//                                 }
//                             }
//                         )
//                     }
//                 }
//             }
//         )
//
//         db.query(`SELECT * FROM likes WHERE userId = '${req.query.userId}' GROUP BY postId`, (err, row) => { //on cherche le nombre de commentaires laissés par l'utilisateur, et sur quels articles
//             if (err || row.length === 0) { // si pas de résultats : erreur
//                 console.log('pas de likes publiés');
//             } else { // si résultats
//                 console.log(7);
//                 for (let i of row) { // pour chaque paire clé/valeur obtenue...
//                     const likesPostId = i.postId; // ... on crée une constante pour chaque valeur : id de l'article et total de coms associé,
//                     console.log(8);
//                     db.query(`SELECT * FROM posts WHERE postId = '${likesPostId}'`, (err, row) => { // ... on cherche dans la table articles tous les articles avec les id obtenus
//                         if (err || row.length === 0) { // si pas de résultats : erreur
//                             console.log('carotte');
//                         } else { // si résultats
//                             const totalLikes = row[0].likes;
//                             console.log(9);
//                             const newTotal = totalLikes - 1;
//                             console.log(10);
//                             db.query(`UPDATE posts SET posts.likes = '${newTotal}' WHERE postId = '${likesPostId}'`); // on met à jour le total des coms pour chacun de ces articles.
//                             console.log(11);
//                         }
//                     })
//                 }
//             }
//         })
//
//         db.query(`SELECT * FROM dislikes WHERE userId = '${req.query.userId}' GROUP BY postId`, (err, row) => { //on cherche le nombre de commentaires laissés par l'utilisateur, et sur quels articles
//             if (err || row.length === 0) { // si pas de résultats : erreur
//                 console.log('pas de dislikes publiés');
//             } else { // si résultats
//                 console.log(12);
//                 for (let i of row) { // pour chaque paire clé/valeur obtenue...
//                     const dislikesPostId = i.postId; // ... on crée une constante pour chaque valeur : id de l'article et total de coms associé,
//                     console.log(13);
//                     db.query(`SELECT * FROM posts WHERE postId = '${dislikesPostId}'`, (err, row) => { // ... on cherche dans la table articles tous les articles avec les id obtenus
//                         if (err || row.length === 0) { // si pas de résultats : erreur
//                             console.log('navet');
//                         } else { // si résultats
//                             const totalDislikes = row[0].dislikes;
//                             console.log(14);
//                             const newTotal = totalDislikes - 1;
//                             console.log(15);
//                             db.query(`UPDATE posts SET posts.dislikes = '${newTotal}' WHERE postId = '${dislikesPostId}'`); // on met à jour le total des coms pour chacun de ces articles.
//                         }
//                     })
//                 }
//             }
//         })
//         db.query(`DELETE FROM users WHERE userId = '${req.query.userId}'`)
//         console.log(16);
//         res.status(204).json();
//     }
// })
exports.deleteUser = (req, res) => {
    try {
        db.query(`SELECT * FROM users WHERE userId = '${req.query.userId}'`, (err, row) => { // on cherche l'utilisateur en question dans la bdd
            if (err || row.length === 0) {
                res.status(401).json({message: 'Impossible de supprimer le compte !'}); // si on le trouve pas : message d'impossibilité de suppression
            } else { // si on le trouve
                db.query(`SELECT postId, COUNT(*) AS totalComs FROM coms WHERE userId = '${req.query.userId}' GROUP BY postId`, (err, row) => { //on cherche le nombre de commentaires laissés par l'utilisateur, et sur quels articles
                        if (err || row.length === 0) { // si pas de résultats : erreur
                            console.log('pas de commentaires publiés');
                        } else { // si résultats
                            console.log(1);
                            for (let i of row) { // pour chaque paire clé/valeur obtenue...
                                const comsPostId = i.postId; // ... on crée une constante pour chaque valeur : id de l'article et total de coms associé,
                                console.log(2);
                                const comsTotalComs = i.totalComs;
                                console.log(3);
                                db.query(`SELECT * FROM posts WHERE postId = '${comsPostId}'`, (err, row) => { // ... on cherche dans la table articles tous les articles avec les id obtenus
                                        if (err || row.length === 0) {
                                            console.log('chou');
                                        } else {
                                            const totalComs = row[0].totalComs;
                                            console.log(4);
                                            const newTotal = totalComs - comsTotalComs;
                                            console.log(5);
                                            db.query(`UPDATE posts SET posts.totalComs = '${newTotal}' WHERE postId = '${comsPostId}'`); // on met à jour le total des coms pour chacun de ces articles.
                                            console.log(6);
                                        }
                                    }
                                )
                            }
                        }
                    }
                )

                db.query(`SELECT * FROM likes WHERE userId = '${req.query.userId}' GROUP BY postId`, (err, row) => { //on cherche le nombre de commentaires laissés par l'utilisateur, et sur quels articles
                    if (err || row.length === 0) { // si pas de résultats : erreur
                        console.log('pas de likes publiés');
                    } else { // si résultats
                        console.log(7);
                        for (let i of row) { // pour chaque paire clé/valeur obtenue...
                            const likesPostId = i.postId; // ... on crée une constante pour chaque valeur : id de l'article et total de coms associé,
                            console.log(8);
                            db.query(`SELECT * FROM posts WHERE postId = '${likesPostId}'`, (err, row) => { // ... on cherche dans la table articles tous les articles avec les id obtenus
                                if (err || row.length === 0) { // si pas de résultats : erreur
                                    console.log('carotte');
                                } else { // si résultats
                                    const totalLikes = row[0].likes;
                                    console.log(9);
                                    const newTotal = totalLikes - 1;
                                    console.log(10);
                                    db.query(`UPDATE posts SET posts.likes = '${newTotal}' WHERE postId = '${likesPostId}'`); // on met à jour le total des coms pour chacun de ces articles.
                                    console.log(11);
                                }
                            })
                        }
                    }
                })

                db.query(`SELECT * FROM dislikes WHERE userId = '${req.query.userId}' GROUP BY postId`, (err, row) => { //on cherche le nombre de commentaires laissés par l'utilisateur, et sur quels articles
                    if (err || row.length === 0) { // si pas de résultats : erreur
                        console.log('pas de dislikes publiés');
                    } else { // si résultats
                        console.log(12);
                        for (let i of row) { // pour chaque paire clé/valeur obtenue...
                            const dislikesPostId = i.postId; // ... on crée une constante pour chaque valeur : id de l'article et total de coms associé,
                            console.log(13);
                            db.query(`SELECT * FROM posts WHERE postId = '${dislikesPostId}'`, (err, row) => { // ... on cherche dans la table articles tous les articles avec les id obtenus
                                if (err || row.length === 0) { // si pas de résultats : erreur
                                    console.log('navet');
                                } else { // si résultats
                                    const totalDislikes = row[0].dislikes;
                                    console.log(14);
                                    const newTotal = totalDislikes - 1;
                                    console.log(15);
                                    db.query(`UPDATE posts SET posts.dislikes = '${newTotal}' WHERE postId = '${dislikesPostId}'`); // on met à jour le total des coms pour chacun de ces articles.
                                }
                            })
                        }
                    }
                })
                db.query(`DELETE FROM users WHERE userId = '${req.query.userId}'`)
                console.log(16);
                res.status(204).json();
            }
        })
    } catch (error) {
        res.status(500).json({error})
    }
};
