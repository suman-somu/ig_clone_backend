//user login, logout and register
const User = require("../models/userModel");
const tokens = require("../utils/tokens");

const signup = async (req, res) => {
  try {
    const data = req.body;
    const { username, password, email } = data;
    const createduser = new User({
      username: username,
      password: password,
      email: email,
    });
    const saveuser = await createduser.save();
    console.log(username + "signup successful");
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
    const query = User.where({ username: username });
    const user = await query.findOne();
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
    const accessToken = tokens.AccessToken(user);
    await User.findByIdAndUpdate(user._id, {
      accessToken: accessToken,
    });
    const { jwtToken, password: newpass, ...other } = user._doc;
    res.status(200).send({
      status: "success",
      message: "logged in successfully",
      data: other,
      accessToken,
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