const Post = require("../../models/postModel");
const User = require("../../models/userModel");
const { filterPublicPostDetails } = require("../../utils/filter");

const getUserPostDetails = async (req, res) => {
  try {
    console.log("inside getUserPostDetails");

    // Extract the necessary data from the request body (you may adjust this based on your actual request)
    const { username, accesstoken, pid } = req.headers;

    // console.log(username, pid, accesstoken);
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send({
        status: "failure",
        message: "User not found",
      });
    }

    const match = accesstoken === user.accessToken;
    if (!match) {
      return res.status(401).send({
        status: "failure",
        message: "access token not matched. not authorized",
      });
    }

    const postid = user.posts;
    const postidmatch = postid.includes(pid);
    if (!postidmatch) {
      return res.status(401).send({
        status: "failure",
        message: "not authorized",
      });
    }

    //check if post is present in the database
    const post = await Post.findOne({ postid: pid });
    if (!post) {
      return res.status(404).send({
        status: "failure",
        message: "Post not found",
      });
    }

    console.log(" requested post details : " + post);
    console.log("successful")
    res.status(200).send({
      status: "success",
      message: "Post details retrieved successfully",
      postdetails: filterPublicPostDetails(post),
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

const getPostDetails = async (req, res) => {
  try {
    // console.log(req);

    // Extract the necessary data from the request body (you may adjust this based on your actual request)
    const { username, accesstoken, pid } = req.headers;

    // console.log(username, pid, accesstoken);
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).send({
        status: "failure",
        message: "User not found",
      });
    }

    const match = accesstoken === user.accessToken;
    if (!match) {
      return res.status(401).send({
        status: "failure",
        message: "access token not matched. not authorized",
      });
    }

    //check if post is present in the database
    const post = await Post.findOne({ postid: pid });
    if (!post) {
      return res.status(404).send({
        status: "failure",
        message: "Post not found",
      });
    }

    console.log(username+" requested post details of "+pid);
    res.status(200).send({
      status: "success",
      message: "Post details retrieved successfully",
      postdetails:post,
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

module.exports = { getUserPostDetails, getPostDetails };
