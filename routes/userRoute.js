const router = require("express").Router();
const authController = require("../controller/authController");
const postController = require("../controller/post/postController");
const profileController = require("../controller/profileController");
const searchPrediction = require("../controller/search/search_prediction");
const searchProfile = require("../controller/search/search_profile");
const getPostDetails = require("../controller/post/postDetails");
const feed = require("../controller/feed/feedController");
const likeController  = require("../controller/feed/likeController");


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
router.get("/getuserpostdetails", getPostDetails.getUserPostDetails);
router.get("/getpostdetails", getPostDetails.getPostDetails);
router.get("/feed", feed.getFeed);
router.get("/getfileid", feed.getFileId);
router.put("/like", likeController.likeUnlike);

module.exports = router;