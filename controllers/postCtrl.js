const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const path = require('path');
const jwt = require('jsonwebtoken');


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
                    return res.status(400).render('feed', { message: "Erreur Lors de L'envoi du message"});
                    
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
                    req.session.message = "Votre texte n'a pas été publiée!";
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
                    return res.status(400).render('feed', {message: "Erreur Lors de L'envoi de votre image"});
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


//     // Update post

// exports.put = async (req, res) => {
//   const { postId, content } = req.body;

//   db.query(
//     'UPDATE post SET postContent = ? WHERE idPost = ?',
//     [content, postId],
//     (error) => {
//       if (error) {
//         console.log(error);
//         return res.status(400).render('feed', { message: "Error to edit your post" });
//       }
//       return res.status(200).render('feed', { message: "your post has been successfully edited" });
//     }
//   );
// };


//------------------------- Commentaires des posts ----------------------
  
    exports.postComment = async (req, res) => {
        //On récupére L'id Utilisateur et Son commentaire
        const { idUser, idmessage, textComment } = req.body
        //On récupére son image
        const filename = req.file;
    
        //On regarde se qu'il envoie
        //Si il envoie une Image ET du texte
        if( textComment && filename){
            db.query(
                'INSERT INTO comments (CommentContent , CommentImg , CommentDate , idUser, idPOST ) VALUES (?, ?, NOW() ,?,?)',
                [textComment, filename.filename , idUser, idmessage],
                (error) =>{
                    if(error){
                        console.log(error);
                        return res.status(400).render('feed', { message: "Erreur Lors de L'envoi du message"});
                        
                    }
                    return res.status(400).render('feed', { message: "Message Poster avec Succès",
                    });
                }
            )
            // si un commentaire sans image
        }else if(content){
            db.query( 'INSERT INTO comments (CommentContent, CommentDate , idUser, idPOST  ) VALUES (?, NOW() ,?, ?)',
                [textComment, userId, idmessage],
                (error) => {
                    if(error){
                        console.log(error);
                        req.session.message = "Votre texte n'a pas été publiée!";
                        return res.redirect('/feed');
                    }
                    req.session.message = "Votre texte a bien été publiée!";
                    return res.redirect('/feed');
                }
            )
            // 
        }else if(filename){
            db.query( 'INSERT INTO  (CommentContent, CommentDate , idUser, idPOST ) VALUES (?, NOW() ,?,?)',
                [filename.filename, userId],
                (error) => {
                    if(error){
                        console.log(error);
                        return res.status(400).render('feed', {message: "Erreur Lors de L'envoi de votre image"});
                    }
                    req.session.message = "Votre image a bien été publiée!";
                    return res.redirect('/feed');
                }
            )
        }else{
            console.log("C'est Vide");
        }
        
    }
    


    // exports.fetchpost = (req, res, next) => {
    // //Requete Sql pour récupérer les messages
    // db.query(
    //     'SELECT p.idPost, p.postContent, p.postImg, p.postDate, p.idUser, u.idUser, u.firstName, u.lastName, u.profileImg, u.role FROM post p JOIN users u ON p.idUser = u.idUser ORDER BY p.idPost DESC',
    //     (error, results) => {
    //     if (error) {
    //         //SI il y a une erreur on log l'erreur
    //         console.log(error);
    //         //Et renvoie les posts vide
    //         req.session.posts = [];
    //     } else {
    //         //Sinon on Stock les posts dans results (donc dans la sessions)
    //         req.session.posts = results;
    //     }
    //     //On passe a la prochaine fonctions
    //     next();
    //     }
    // );
    // };
