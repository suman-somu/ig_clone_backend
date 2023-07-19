const router = require("express").Router();
const authController = require("../controller/authController");
const postController = require("../controller/postController");
const profileController = require("../controller/profileController");


const multer = require('multer');
const upload = multer({dest: '__dirname' + '../../../uploads/posts'});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/post",upload.array('photo', 10), postController.post);
router.post("/profile", profileController.getProfileInfo);

module.exports = router;