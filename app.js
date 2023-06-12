const express = require('express');
// afficher messages à nos users
const handlebarsHelpers = require('handlebars-helpers');
const flash = require ('connect-flash');
const session = require ('express-session');
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const hbs = require('hbs');
const handlebars = require('handlebars');
const fs = require('fs');
const cookieParser = require('cookie-parser');


dotenv.config({ path: './.env' });

const app = express();

app.use(express.urlencoded({ extended: false }));
// Methode Json d'express qui permet de convertir les contenus des requêtes en format Json
app.use(express.json());
app.use(cookieParser());

const publicDirectory = path.join(__dirname, './public');
const viewsDirectory = path.join(__dirname, './views');

app.use(express.static(publicDirectory));
// 



app.set('view engine', 'hbs');
app.set('views', viewsDirectory);


const header = fs.readFileSync('./views/header.hbs', 'utf8');
const footer = fs.readFileSync('./views/footer.hbs', 'utf8');

hbs.registerPartial('header', header);
hbs.registerPartial('footer', footer);

handlebarsHelpers({ handlebars: hbs.handlebars });
hbs.registerHelper('ifCond', function(v1,v2,options){
  if(v1 == v2){
    return options.fn(this);
  }else{
    return options.inverse(this)
  }
});

// Definir routes

app.use(session({
  secret: 'helloguys',
  saveUninitialized: true,
  resave: true
}));

// routes get :
app.use('/', require('./routes/pages'))
// routes post :
app.use('/auth', require('./routes/auth'));





// app.get('/', (req, res) => {
//     req.flash('success', `You've been successfully redirected to the Message route!`)
//     res.redirect('/message')
// })

// app.get('/message', (req, res) => {
//     res.send(req.flash('success'))
// })


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
