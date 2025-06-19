const express = require("express");
const User = require("../models/user");
const authRouter = express.Router();
const bcrypt = require("bcryptjs");
const { validateSignupData, validateLoginData } = require("../utils/validate");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    validateSignupData(req);

    const isUserPresent = await User.findOne({ email: email });
    if (isUserPresent) {
      return res.status(400).json({
        message: "User Already present",
        success: false,
        error: true,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: passwordHash,
    });

    await newUser.save();

    res.status(200).json({
      data: newUser,
      message: "Signup successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    validateLoginData(req);

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
        error: true,
      });
    }

    const dcryptPassword = await bcrypt.compare(password, user.password);
    if (!dcryptPassword) {
      return res.status(400).json({
        message: "Invalid Password",
        success: false,
        error: true,
      });
    }

    const token = await jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.status(200).json({
      message: "Logout successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

module.exports = { authRouter };
