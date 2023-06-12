const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const path = require('path');
const jwt = require('jsonwebtoken');
const { log } = require("console");


dotenv.config({ path: "../.env"});


// exports.post = async (req, res) => {
//     const postObject = {
//         postContent: req.body.content,
//         postImg: req.file.originalname,
//         postDate: Date.now(),
//         idUser: 4
// idUser : recuperer token decoder grâce à la fonction qu'on va créer
//     }

//     db.query('INSERT INTO post SET ?', postObject, (error, results) => {
//         if (error) {
//             console.log(error);
//             return res.render('feed', { message: "An error occurred" });
//         } else if (results > 0) {
//             return res.render('feed', { message: 'Message created successfully' });
//         }
//     });
// }

//Range dans la boite
exports.post = async (req, res) => {
    //On récupére L'id Utilisateur et Son Message
    const { userId, content } = req.body
    console.log(req.body);
    console.log(req.file)
    //On récupére son image
    const filename = req.file;

    //On regarde se qu'il envoie
    //Si il envoie une Image ET du texte
    if(content && filename){
        db.query(
            'INSERT INTO post (postContent , postImg , postDate , idUser ) VALUES (?, ?, NOW() ,?)',
            [content, filename.filename ,  userId],
            (error) =>{
                if(error){
                    console.log(error);
                    return res.status(400).render('feed', { messages: "Erreur Lors de L'envoi du message"});
                    
                }
                return res.status(400).render('feed', { message: "Message Poster avec Succès",
                });
            }
        )
    }else if(content){
        db.query( 'INSERT INTO post (postContent, postDate , idUser ) VALUES (?, NOW() ,?)',
            [content, userId],
            (error) => {
                if(error){
                    console.log(error);
                    req.session.messages = "Votre texte n'a pas été publiée!";
                    return res.redirect('/feed');
                }
                req.session.message = "Votre texte a bien été publiée!";
                return res.redirect('/feed');
                
            }
        )
    }else if(filename){
        db.query( 'INSERT INTO post (postImg, postDate , idUser ) VALUES (?, NOW() ,?)',
            [filename.filename, userId],
            (error) => {
                if(error){
                    console.log(error);
                    return res.status(400).render('feed', {messages: "Erreur Lors de L'envoi de votre image"});
                }
                req.session.message = "Votre image a bien été publiée!";
                return res.redirect('/feed');
            }
        )
    }else{
        console.log("C'est Vide");
    }
    
}
//Sortir de la boite
// fetch : permet de recuperer de la data
exports.fetchpost = (req, res, next) => {
    //Requete Sql pour récupérer les messages
    db.query(
        'SELECT p.idPost, p.postContent, p.postImg, p.postDate, p.idUser, u.idUser, u.firstName, u.lastName, u.profileImg, u.role FROM post p JOIN users u ON p.idUser = u.idUser ORDER BY p.idPost DESC',
        (error, results) => {
        if (error) {
            //SI il y a une erreur on log l'erreur
            console.log(error);
            //Et renvoie les posts vide
            req.session.posts = [];
        } else {
            //Sinon on Stock les posts dans results (donc dans la sessions)
            req.session.posts = results;
        }
        //On passe a la prochaine fonctions
        next();
        }
    );
    };


//------------------------- Commentaires des posts ----------------------

    exports.Comment = async (req, res) => {
        //On récupére L'id Utilisateur et Son commentaire
        const { idUser, idmessage, textComment } = req.body;
        console.log(req.body);
        console.log(req.file)
        //On récupére son image
        const filename = req.file;
        
        //On regarde se qu'il envoie
        //Si il envoie une Image ET du texte
        if( textComment && filename){
            db.query(
                'INSERT INTO comment (CommentContent , CommentImg , CommentDate , idUser, idPost ) VALUES (?, ?, NOW() ,?,?)',
                [textComment, filename.filename , idUser, idmessage],
                (error) =>{
                    if(error){
                        console.log(error);
                        return res.status(400).render('feed', { messages: "Erreur Lors de L'envoi du message"});
                        
                    }
                    return res.status(400).render('feed', { message: "Message Poster avec Succès",
                    });
                }
            )
            // si un commentaire sans image
        }else if(textComment){
            db.query( 'INSERT INTO comment (CommentContent, CommentDate , idUser, idPost  ) VALUES (?, NOW() ,?, ?)',
                [textComment, idUser, idmessage],
                (error) => {
                    if(error){
                        console.log(error);
                        req.session.messages = "Votre texte n'a pas été publiée!";
                        return res.redirect('/feed');
                    }
                    req.session.message = "Votre texte a bien été publiée!";
                    return res.redirect('/feed');
                }
            )
            // 
        }else if(filename){
            db.query( 'INSERT INTO comment (CommentImg, CommentDate , idUser, idPost ) VALUES (?, NOW() ,?,?)',
                [filename.filename, idUser, idmessage],
                (error) => {
                    if(error){
                        console.log(error);
                        return res.status(400).render('feed', {messages: "Erreur Lors de L'envoi de votre image"});
                    }
                    req.session.message = "Votre image a bien été publiée!";
                    return res.redirect('/feed');
                }
            )
        }else{
            console.log("C'est Vide");
        }
        
    }
    


    exports.fetchcomment = (req, res, next) => {
    //Requete Sql pour récupérer les messages
    db.query(
        'SELECT c.idComment, c.commentContent, c.commentImg, c.commentDate, c.idUser, c.idPost, u.idUser, u.firstName, u.lastName, u.profileImg, u.role FROM comment c JOIN users u ON c.idUser = u.idUser ORDER BY c.idComment DESC',
        (error, results) => {
        if (error) {
            //SI il y a une erreur on log l'erreur
            console.log(error);
            //Et renvoie les posts vide
            req.session.comments = [];
        } else {
            //Sinon on Stock les posts dans results (donc dans la sessions)
            req.session.comments = results;
        }
        //On passe a la prochaine fonction
        next();
        }
    );
    };
