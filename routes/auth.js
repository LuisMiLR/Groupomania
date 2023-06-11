const express = require ('express');
const authCtrl = require('../controllers/userCtrl');
const messageCtrl = require('../controllers/postCtrl');
const path = require('path')
const router = express.Router();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: 'public/uploads/',
    filename:(req,file,cb)=>{
        const randomString = Math.random().toString(36).substring(2,7);
        const currentDate = Date.now();
        const originalExtension = path.extname(file.originalname);
        const newNameImg = `${currentDate}-${randomString}${originalExtension}`;
        cb(null, newNameImg)
    }
})

const upload = multer({ storage });


router.post('/',  authCtrl.login);

router.post('/register',  authCtrl.register);

router.post('/logout', authCtrl.logout);

router.post('/message', upload.single('avatar'), messageCtrl.post);

router.post('/postComment', upload.single('avatar'), messageCtrl.postComment);

router.post('/profile', authCtrl.isLoggedIn);



module.exports = router; 