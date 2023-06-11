const express = require ('express');
const router = express.Router();
const mysql = require("mysql");
const {isLoggedIn} = require('../controllers/userCtrl');
const {fetchpost} = require('../controllers/postCtrl')


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
router.get("/feed", isLoggedIn, fetchpost ,(req, res) => {

    const posts = req.session.posts

    const message = req.session.message;
    // Te dit qui est connecté
    const user = req.user;
    res.render("feed", {user , posts , message});
})

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile");
})

router.get("/comments", (req, res) => {
    res.render("comments")
})

module.exports = router;