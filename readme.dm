# Groupomania 🖥

Création d'un reseau social L'objectif est de construire **From Scratch** un réseau social d'entreprise.


#  Technologies utilisées

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white" /> 
 

## API Routes

Toutes les routes doivent disposer d’une autorisation (le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer »). Avant que l'utilisateur puisse apporter des utiliser les routes **put** et **delete**, le code doit vérifier si l'userId actuel correspond à l'userId du profil, du post ou du commentaire. Cela permet de s'assurer que seul le propriétaire du profil, des posts ou des commentaires peut apporter des modifications à celle-ci ou les supprimer.
**L'administrateur** quant à lui, peut, supprimer n'importe quel commentaire, post ou profil.

## Exigences de sécurité

-   Le mot de passe de l'utilisateur doit être haché.
-   L'authentification doit être renforcée sur toutes les routes requises.
-   Les adresses électroniques dans la base de données sont uniques.
-   La sécurité de la base de données MySQL ne doit pas empêcher l'application de se lancer sur la machine d'un utilisateur.
-   Les versions les plus récentes des logiciels sont utilisées avec des correctifs de sécurité actualisés.
-   Le contenu du dossier images et dotenv ne doit pas être téléchargé sur GitHub.


# Installation

**Backend :**
- Télécharger *NodeJS*
- Créer un fichier `.env` pour remplir les variables d'environnements
- Se rendre dans le dossier `Backend`, installer Node et toute les dépendances avec `npm i`
- Lancer le serveur avec `npm run dev`
- Utiliser `Ctrl+C` pour stopper le serveur
- Utilisation du `PORT = 3000`

**Frontend :**
- Ouvrir un nouveau terminal et se rendre dans le dossier `Frontend`
- Lancer React avec la commande `npm start`