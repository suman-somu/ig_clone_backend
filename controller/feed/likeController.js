const User = require("../../models/userModel");
const Post = require("../../models/postModel");

const likeUnlike = async (req, res) => {
  console.log("like/unlike");
  try {

    console.log("1");
    const { username, accesstoken, postid } = req.headers;

    //null check
    if (username == null || accesstoken == null) {
      return res.status(401).send({
        status: "failure",
        message: "not a valid user",
      });
    }
    console.log("2");
    //user validation
    const query = User.where({ username: username });
    const user = await query.findOne();
    if (!user) {
      return res.status(401).send({
        status: "failure",
        message: "user does not exist",
      });
    }
    console.log("3");
    //authentication
    const match = accesstoken === user.accessToken;
    if (!match) {
      return res.status(401).send({
        status: "failure",
        message: "unauthorized",
      });
    }
    console.log("4");

    //find post
    const query1 = Post.where({postid });
    const post = await query1.findOne();
    if (!post) {
      return res.status(401).send({
        status: "failure",
        message: "post does not exist",
      });
    }
    console.log(post);
    console.log("5");
    const likesList = post.likes;
    const index = likesList.indexOf(username);
    if (index > -1) {
      post.likes.splice(index, 1);
    } else {
      post.likes.push(username);
    }
    console.log("5");

    //update post
    await post.save();
    console.log("6");

    console.log("like/unlike successful");
    res.status(200).send({
      status: "success",
      message: "liked successfully",
      data: {
        likes: likesList,
      },
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

module.exports = { likeUnlike };
