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
  const { nameofuser, username, profilePicture } = jsonUserData;
  return { nameofuser, username, profilePicture };
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
