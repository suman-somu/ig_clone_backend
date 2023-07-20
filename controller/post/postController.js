const Post = require("../../models/postModel");
const User = require("../../models/userModel");
const pid = require("../../utils/postid");
const appwriteUpload = require("./appwrite_upload");

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

    const filepath = req.files.map((file) => file.path);

    for (const file of filepath) {
      const parts = file.split("/");
      const lastpart = parts[parts.length - 1];
      filepath[filepath.indexOf(file)] = lastpart;
    }

    //upload image to appwrite
    if (appwriteUpload(filepath)) {
      const postid = pid();
      const { caption } = req.body;

      const createdpost = new Post({
        postid: postid,
        caption: caption,
        filepath: filepath,
      });

      //store post in db
      const savepost = await createdpost.save();

      //store postid to user model
      user.posts.push(postid);
      await user.save();

    } else {
      console.log("failed to upload to appwrite");
      res.status(500).send({
        status: "failure",
        message: "failed to upload the image in server",
      });
    }

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
