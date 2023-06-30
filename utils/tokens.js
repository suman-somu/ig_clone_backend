const jwt = require("jsonwebtoken");

const AccessToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
    "mySecretKeyfromenv",
    { expiresIn: "2s" }
  );
};
const RefreshToken = (user) => {
  return jwt.sign(
    { username: user.username, role: user.role, _id: user._id },
    "myRefreshSecretKeyfromenv"
  );
};

module.exports = { AccessToken, RefreshToken };