//user login, logout and register
const user = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const data = req.body;
    const { username, password, email } = data;
    const createduser = new user({
      username: username,
      password: password,
      email: email,
    });
    const saveuser = await createduser.save();
    console.log("added user");
    res.status(200).send({
      status: "success",
      message: "user saved successfully",
      data: {
        user: username,
      },
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await user.findOne({ username: username });
    if (!user) {
      return res.status(401).send({
        status: "failure",
        message: "user does not exist",
      });
    }
    const match = password === user.password;
    if (!match) {
      return res.status(401).send({
        status: "failure",
        message: "password is incorrect",
      });
    }
    const accessToken = generateToken.generateAccessToken(user);
    const refreshToken = generateToken.generateRefreshToken(user);
    await User.findByIdAndUpdate(user._id, {
      jwtToken: refreshToken,
    });
    const { jwtToken, password: newpass, ...other } = user._doc;
    res.status(200).send({
      status: "success",
      message: "logged in successfully",
      data: other,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await User.updateOne({ jwtToken: refreshToken }, [
        { $unset: ["jwtToken"] },
      ]);
      res.status(200).send({
        status: "success",
        message: "You've been logged out",
      });
    } else {
      return res.status(400).send({
        status: "failure",
        message: "logout error",
      });
    }
  } catch (e) {
    res.status(500).send({
      status: "failure",
      message: e.message,
    });
  }
};

module.exports = { signup, login, logout };