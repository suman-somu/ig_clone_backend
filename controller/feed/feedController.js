const User = require("../../models/userModel");

const getFeed = async (req, res) => {
//   console.log(req);
console.log("getFeed called");
  try {
    const { username, accesstoken } = req.headers;

    //if username and accessToken are null, return 401
    if (username == null || accesstoken == null) {
        return res.status(401).send({
            status: "failure",
            message: "unauthorized",
        });
    }
    const query = User.where({ username: username });
    const user = await query.findOne();
    if (!user) {
      return res.status(401).send({
        status: "failure",
        message: "user does not exist",
      });
    }
    //authentication
    const match = accesstoken === user.accessToken;
    if (!match) {
      return res.status(401).send({
        status: "failure",
        message: "unauthorized",
      });
    }
    //retreive the following list from the user 
    const followinglist = user.following;

    //get post list from each userid of the following list 
    var postidlist=[];
    for(let i=0;i<followinglist.length;i++){
        const query = User.where({ username: followinglist[i] });
        const usr = await query.findOne();
        if (!usr) {
            return res.status(401).send({
              status: "failure",
              message: "user does not exist",
            });
        }
        postidlist.push(...usr.posts);
    }
    //sort the postidlist
    postidlist = postidlist.sort();

    console.log("post id lists made and returned");
    res.status(200).send({
      status: "success",
      message: "feed updated successfully",
      data: {
        "postidlist": postidlist,
      },
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

module.exports = { getFeed };
