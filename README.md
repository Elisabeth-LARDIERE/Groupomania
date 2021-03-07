# Groupomania - Formation Développeur Web d'Openclassrooms
Projet 7 : création d'un réseau social d'entreprise.

## Stack technique :

- Base de données : MySql.
- Backend : NodeJs / Express.
- Frontend : React.

## Prérequis :

- Installer NodeJs et MySql.
- Cloner le projet sur votre machine.
- Copier le contenu du fichier .env fourni à part dans le fichier du même nom situé dans le projet (backend > .env).

## Importation de la base de données :

- Dans un serveur MySql, entrez la commande suivante pour créer une nouvelle base de donnéees :
  #### `CREATE DATABASE groupomania;`
  
- Dans le fichier .env, remplacer [your_root_password] par votre mot de passe root mysql.  

- Pour importer le contenu du fichier groupomania.sql (backend > database > groupomania.sql) dans cette nouvelle base de données, entrez la commande suivante, 
  en remplaçant "user" et "password" par les données du fichier .env :

  #### `mysql -u user -p password groupomania < groupomania.sql`

## Lancement de l'application :

- Allez dans le dossier backend de l'application :

  - installez les dépendances avec la commande suivante :
    #### `npm install`
  - lancez le serveur avec la commande suivante :
    #### `nodemon`
    
- Allez dans le dossier frontend de l'application :

  - installez les dépendances avec la commande suivante :
    #### `npm install`
  - lancez l'application avec la commande suivante :
    #### `npm start` (http://localhost:3000/)

## Fonctionnement de l'application :

- Créez un compte sur la page d'inscription en renseignant un nom, un prénom, une adresse mail et un mot de passe. 
  Chacun de ses paramètres doit répondre à des conditions de validité qui apparaissent sous les champs lorsque ses conditions ne sont pas remplies.

- Connectez vous ensuite sur la page de connexion en renseignant l'adresse mail et le mot de passe précédemment enregistrés.

- Une fois sur la page d'accueil, vous avez accès à la totalité des articles déjà publiés par les autres utilisateurs. 
  Vous avez la possibilité de trier ces articles par dates ou par popularité.

- Vous pourrez accéder à un article individuel, le commenter, le liker ou le disliker. 

- Vous pourrez également publier des articles, accéder à toutes vos publications et les supprimer si vous le souhaitez.

- Vous pourrez aussi accéder à votre profil et le modifier, notamment en changeant l'avatar par défaut qui vous a été attribué lors de votre inscription.

- Vous pourrez enfin vous déconnecter de l'application.

- Le modérateur du site possède des droits supplémentaires : supprimer n'importe quel article et/ou commentaire de n'importe quel utilisateur.
  Vous pouvez vous connecter en tant que modérateur en utilisant les identifiants spécifiés dans le fichier .env.



 

  



