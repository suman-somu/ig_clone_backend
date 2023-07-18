const Post = require("../models/postModel");
const User = require("../models/userModel");
const pid = require("../utils/postid");


const post = async (req, res) => {
  try {
    const { username, accessToken } = req.body;
    const query = User.where({ username: username });
    const user = await query.findOne();
    if (!user) {
      return res.status(401).send({
        status: "failure",
        message: "user does not exist",
      }); 
    }
    const match = accessToken === user.accessToken;
    if (!match) {
      return res.status(401).send({
        status: "failure",
        message: "Not Authorised tp post",
      });
    }

    const postid = pid();
    const { caption } = req.body;
    const filepath = req.files.map((file) => file.path);

    const createdpost = new Post({
      postid: postid,
      caption: caption,
      filepath: filepath,
    });

    const savepost = await createdpost.save();

    user.posts.push(postid);
    await user.save();

    console.log("posted successful");
    res.status(200).send({
      status: "success",
      message: "posted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

module.exports = { post };
