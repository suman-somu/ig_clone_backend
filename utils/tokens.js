const jwt = require("jsonwebtoken");

const AccessToken = (user) => {
  return jwt.sign(
    { username: user.username, _id: user._id, password: user.password},
    "mySecretKey"
  );
};
const RefreshToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
    "myRefreshSecretKey"
  );
};

module.exports = { AccessToken, RefreshToken };