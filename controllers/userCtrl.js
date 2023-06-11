const dotenv = require("dotenv");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const path = require('path');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


dotenv.config({ path: "../.env"});


exports.register = async (req, res) => {
    
    const { lastname, firstname, email, password, passwordConfirm } = req.body;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/

// Permet de vérifier si les champs sont vides ou pas 

    if ( ! lastname  || !firstname|| !email || !password || !passwordConfirm ) {
        return res.render('register', { message: 'Please fill all the fields to valid your inscription !' });
    }

    if(password !== passwordConfirm ) {
        return res.render('register', { message : 'the password does not match, try again'})
    }

    // Validation de l'e-mail et du mot de passe
    if (!emailRegex.test(email)) {
        return res.render('register', { message: 'Veuillez entrer une adresse e-mail valide.' });
    }

    if (!passwordRegex.test(password)) {
        return res.render('register', { message: 'Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial.' });
    }

    // Connexion à la base de donnée :
    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
        if(error) {
            console.log(error);
            return res.render('register', { message: "An error occurred"  });
    
        } if(results.length > 0 || !results) {
            return res.render('register', { message : 'This email is already taken'});

        }

        let hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);


    db.query('INSERT INTO users SET ?', { lastName: lastname , firstName : firstname , email : email , password: hashedPassword }, (error) => {
        if(error) {
            console.log(error);
            return res.render('register', { message : "An error occurred"  });
        }else {
            return res.render('register', { message : 'You are now registered, please log in'})
        }
    })
//
})

}

exports.login = async (req, res) => {

    // Step 1 Récuperer l'email et le password de l'utilisateur depuis le formulaire
    const { email, password } = req.body;

    // Step 2 Error Handling avant Db !
    // Permet de vérifier si les champs sont vides ou pas
    if (!email || !password) {
    return res.render('login', { message: 'Please provide email and password!' });
    }

    // Step 3 Call De la Db ET error Handling !
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
    console.log(results);
    if (error) {
        console.log(error);
        return res.render('login', { message: 'Failed to login' });
    }else if (!results || results.length === 0) {
        return res.render('login', { message: 'Invalid email or password' });
    } else {
        // Step 4 Verification du match du password user et du hash ! + Error Handling !
        const match = await bcrypt.compare(password, results[0].password);

        // Step 5 All good ? Donne lui un tokken et il peut partir !
        if (match) {
            const id = results[0].idUser;
            
            // Création de notre token : unique 
            const token = jwt.sign({ id } , process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
        
            const BestCookie = {
                // date c'est un constructeur 
                expires : new Date(
                    // notre cookie peut durer autant de jour qu'indiquer dans le .env
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 *1000
                ),
                // Empeche le cookie d'etre modifier par du code js et contre les attaque Xcss on verra ça apres
                httpOnly: true
            }
            res.cookie('jwt_cookie', token , BestCookie );
            
            res.status(200).redirect('/feed')
        }
    }
    });
};

exports.logout = async (req,res) =>{

    //Step 1 : On Vise le tokken
    res.cookie('jwt_cookie','',{
        // Cookie Dead lol
        expires : new Date(0),
        httpOnly: true
    });

    res.status(200).redirect('/')

}

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt_cookie) {
        try {
        // 1) Verify the token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt_cookie, process.env.JWT_SECRET);
        
        // 2) Check if the user still exists
        db.query('SELECT * FROM users WHERE idUser = ?', [decoded.id], (error, result) => {
            if (error) {
            console.log(error);
            return next();
            }

            if (result && result.length > 0) {
            req.user = result[0];
            }
        
            return next();
        });
        } catch (error) {
        console.log(error);
        return next();
        }
    } else {
        return next();
    }
    };
    




