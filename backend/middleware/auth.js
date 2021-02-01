// MIDDLEWARE DE VERIFICATION DES TOKENS ENVOYES AVEC LES REQUETES - PROTECTION DES ROUTES

// imports
const jwt = require('jsonwebtoken');

// fonction de vérification du token envoyé avant d'autoriser les requêtes
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header authorization
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // vérification du token pour authentification utilisateur
        const userId = decodedToken.userId; // décodage du token
        if (req.body.userId && req.body.userId !== userId) { // si id envoyé et id token ne correspondent pas
            throw 'User ID non valable !';

        } else { // s'ils correspondent
            next(); // poursuite de l'exécution
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée!'});
    }
};
