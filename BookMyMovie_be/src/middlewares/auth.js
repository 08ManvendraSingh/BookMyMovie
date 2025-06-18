const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({
      message: "Invalid Token",
      success: false,
      error: true,
    });
  }

  const isValidToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (!isValidToken) {
    return res.status(400).json({
      message: "Invalid Token",
      success: false,
      error: true,
    });
  }

  const { _id } = isValidToken;

  const user = await User.findById(_id);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
      error: true,
    });
  }

  req.user = user;
  next();
};

module.exports = userAuth;
