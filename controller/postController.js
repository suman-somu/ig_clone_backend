const Post = require("../models/postModel");

// const multer = require('multer');

// const upload = multer({dest: '__dirname' + '../../uploads/images'});

const post = async (req, res) => {
  // console.log(req);
  try {
    //make postid
    //the images are stored, retreive the path
    //store caption

    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = currentDate.getDate().toString().padStart(2, "0");
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const seconds = currentDate.getSeconds().toString().padStart(2, "0");

    const postid = Number ( year + month + day + hours + minutes + seconds );
    const { caption } = req.body;
    const filepath = req.file.path;

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
