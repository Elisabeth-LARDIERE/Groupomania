// CONNEXION DE L'APPLICATION A LA BASE DE DONNEES

// imports
const mysql = require('mysql');
require('dotenv').config();

// configuration de connexion à la base de données
const db = mysql.createConnection({
    'host': process.env.host,
    'dialect': 'mysql',
    'database': process.env.database,
    'user': process.env.user,
    'password': process.env.password
})

// test de la connexion à la base de données
db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

// export de l'instance de connexion
module.exports = db;
