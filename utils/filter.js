
const filterPublicProfile = (jsonUserData) => {
    const { nameofuser, username, bio, profilePicture, followers, following, posts, role, gender } = jsonUserData;
    return {nameofuser, username, bio, profilePicture, followers, following, posts, role, gender};
    }

module.exports = filterPublicProfile;