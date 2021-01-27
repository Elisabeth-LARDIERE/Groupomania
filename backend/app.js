// APPLICATION EXPRESS

// importations
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const comRoutes = require('./routes/com');
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

// enregistrement des routeurs utilisateur, article et commentaire
app.use ('/api/v1/auth', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/coms', comRoutes);

module.exports = app;
