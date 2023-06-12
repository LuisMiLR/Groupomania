const express = require ('express');
const router = express.Router();
const mysql = require("mysql");
const {isLoggedIn} = require('../controllers/userCtrl');
const {fetchpost , fetchcomment} = require('../controllers/postCtrl')



router.get("/", isLoggedIn, (req, res) => {
    const user = req.user
        res.render("index", {user});
})

router.get("/register", (req, res) => {
    res.render("register");
})

// router.get("/login", (req, res) => {
//     res.render("login");
// })

// 
router.get("/feed", isLoggedIn, fetchpost, fetchcomment,(req, res) => {

    const posts = req.session.posts

    const comments = req.session.comments

    // gestion message results
    const message = req.session.message;
    // Gestion message erreur 
    const messages = req.session.messages
    // Te dit qui est connecté
    const user = req.user;
    res.render("feed", {user , posts , message ,messages, comments});
})

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile");
})


module.exports = router;