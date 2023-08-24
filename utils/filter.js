const filterPublicProfile = (jsonUserData) => {
  const {
    nameofuser,
    username,
    bio,
    profilePicture,
    followers,
    following,
    posts,
    role,
    gender,
  } = jsonUserData;
  return {
    nameofuser,
    username,
    bio,
    profilePicture,
    followers,
    following,
    posts,
    role,
    gender,
  };
};

const filterForSearchUtil = (jsonUserData) => {
  const { nameofuser, username, profilePicture, bio, followers, following, posts } = jsonUserData;
  return { nameofuser, username, profilePicture, bio, followers, following, posts };
};
const filterPublicProfileSearch = (jsonUserData) => {
  for (i = 0; i < jsonUserData.length; i++) {
    jsonUserData[i] = filterForSearchUtil(jsonUserData[i]);
  }

  return jsonUserData;
};
const filterPublicPostDetails = (jsonPostData) => {
  const { postid, caption, filepath } = jsonPostData;
  return { postid, caption, filepath };
};

module.exports = { filterPublicProfile, filterPublicProfileSearch, filterPublicPostDetails};
