const router = require("express").Router();
const authController = require("../controller/authController");
const postController = require("../controller/post/postController");
const profileController = require("../controller/profileController");
const searchPrediction = require("../controller/search/search_prediction");
const searchProfile = require("../controller/search/search_profile");
const getPostDetails = require("../controller/post/postDetails");


const multer = require('multer');
const upload = multer({dest: '__dirname' + '../../../uploads/posts'});

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/post",upload.array('photo', 10), postController.post);
router.post("/profile", profileController.getProfileInfo);
router.get("/search", searchPrediction.searchPrediction);
router.get("/search/account", searchProfile.searchProfile);
router.put("/search/account", searchProfile.followProfile);
router.delete("/search/account", searchProfile.unfollowProfile);
router.get("/getpostdetails", getPostDetails.getPostDetails);

module.exports = router;