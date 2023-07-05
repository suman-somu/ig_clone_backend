const Post = require("../models/postModel");

// const multer = require('multer');

// const upload = multer({dest: '__dirname' + '../../uploads/images'});

const post = async (req, res) => {
  // console.log(req);
  try {
    
    //make postid
    //the images are stored, retreive the path
    //store caption 

    const { caption } = req.body ;
    const filepath = req.file.path;
    const postid = 1;
    const createdpost = new Post({
        postid: postid,
        caption: caption,
        filepath: filepath,
    });

    const savepost = await createdpost.save();

    console.log("saved successful");
    res.status(200).send({
      status: "success",
      message: "user saved successfully",
    });

  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

module.exports = { post };
