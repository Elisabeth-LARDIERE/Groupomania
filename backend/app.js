// APPLICATION EXPRESS

// importations
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// création de l'application express
const app = express();


// ajout de headers pour toutes les requêtes afin d'autoriser n'importe quel utilisateur à accéder à l'application
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// transformation du corps des requêtes en objets javascript utilisables
app.use(bodyParser.json());

// gestion de tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

// gestion de la ressource images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
