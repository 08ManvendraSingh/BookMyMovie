const express = require("express");
const userAuth = require("../middlewares/auth");
const Booking = require("../models/booking");
const userRouter = express.Router();

userRouter.get("/user", userAuth, (req, res) => {
  try {
    const user = req.user;
    const { password, ...safeUser } = user._doc;

    res.status(200).json({
      data: safeUser,
      message: "fetched user successfully",
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

userRouter.get("/myBookings", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const myBookings = await Booking.find({ user: user._id })
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: myBookings,
      message: "fetched mybooking successfully",
      success: false,
      error: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
});

module.exports = { userRouter };
