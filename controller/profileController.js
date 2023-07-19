const User = require("../models/userModel");

const getProfileInfo = async (req, res ) => {
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
            message: "password is incorrect",
          });
        }
        
        var nameofuser = user.nameofuser;
        var profilepicture = user.profilePicture;
        var noofposts = user.posts.length;
        var followerscount = user.followers.length == null ? 0 : user.followers.length;
        var followingcount = user.following.length == null ? 0 : user.following.length;
        var bio = user.bio == null ? "" : user.bio;
        var postsidlist = user.posts;

        console.log("profile retrieved successfully");
        res.status(200).send({
          status: "success",
          message: "profile retrieved successfully",
          accessToken,
            data: {
                nameofuser,
                profilepicture,
                noofposts,
                followerscount,
                followingcount,
                bio,
                postsidlist
            },
        });
      } catch (e) {
        res.status(500).send({
          status: "failure",
          message: e.message,
        });
      }
}

module.exports = { getProfileInfo } ;