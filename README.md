<h4 align="left"> Groupomania projet FullStack :iphone:</h4>

<br/>
Création d'un reseau social L'objectif est de construire From Scratch un réseau social d'entreprise.
<br/>

<h4 align="left"> 💻 Technologies utilisées:</h4>


<br/>

![CSS](https://img.shields.io/badge/CSS-%23FFac45.svg?&style=for-the-badge&logo=css3&logoColor=white&color=blue)
![JavaScript](https://img.shields.io/badge/JAVASCRIPT-%23FFac45.svg?&style=for-the-badge&logo=javascript&logoColor=white&color=yellow)
![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![EXPRESS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MYSQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)

<br/>
<h4 align="left"> :lock: API Routes:</h4>

<br/>
Toutes les routes dispose d’une autorisation (le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer »). Avant que l'utilisateur puisse apporter des utiliser les routes  **post** **put** et **delete**, le code vérifie si l'userId actuel correspond à l'userId du profil, du post ou du commentaire. Cela permet de s'assurer que seul le propriétaire du profil, des posts ou des commentaires peut apporter des modifications à celle-ci ou les supprimer.
L'administrateur quant à lui, peut, supprimer n'importe quel commentaire, post ou profil.
<br/>
<br/>
<h4 align="left"> :lock: Exigences de sécurité</h4>
<br/>
-   Le mot de passe de l'utilisateur est haché avec Bcrypt.
-   L'authentification est renforcée sur toutes les routes requises.
-   Les adresses électroniques dans la base de données sont uniques.
-   La sécurité de la base de données MySQL n'empêche pas l'application de se lancer sur la machine d'un utilisateur.
<br/>

<br/>
<h4 align="left"> :minidisc: Installation </h4>
<br/>
<h4 align="left"> Backend :</h4>

- Télécharger *NodeJS*
- Créer un fichier `.env` pour remplir les variables d'environnements
- installer Node et toute les dépendances avec `npm i`
- Lancer le serveur avec `npm start`
- Utiliser `Ctrl+C` pour stopper le serveur
- Utilisation du `PORT = 3000`
<br/>
<h4 align="left"> Frontend :</h4>

- Ouvrir le navigateur et saisir l'URI localhost:3000

<br/>
