const router = require("express").Router();
const authController = require("../controller/authController");
const postController = require("../controller/post/postController");
const profileController = require("../controller/profileController");
const searchPrediction = require("../controller/search/search_prediction");

const multer = require('multer');
const upload = multer({dest: '__dirname' + '../../../uploads/posts'});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/post",upload.array('photo', 10), postController.post);
router.post("/profile", profileController.getProfileInfo);
router.get("/search", searchPrediction.searchPrediction);

module.exports = router;