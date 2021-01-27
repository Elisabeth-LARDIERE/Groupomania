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
