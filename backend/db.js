// CONNEXION DE L'APPLICATION A LA BASE DE DONNEES

// imports
const mysql = require('mysql');
const config = require('./config');

// configuration de connexion à la base de données
const db = mysql.createConnection({
    'host': config.db.host,
    'dialect': config.db.dialect,
    'database': config.db.database,
    'user': config.db.user,
    'password': config.db.password
})

// test de la connexion à la base de données
db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

// export de l'instance de connexion
module.exports = db;
