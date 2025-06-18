const express = require("express");
const showRouter = express.Router();
const Movies = require("../models/movie");
const Shows = require("../models/shows");

showRouter.post("/addShow", async (req, res) => {
  try {
    const { movieId, showDate, showTime, showPrice,occupiedSeats } = req.body;

    const isMoviePresent = await Movies.findOne({ _id: movieId });
    if (!isMoviePresent) {
      return res.status(400).json({
        message: "movie not found",
        success: false,
        error: true,
      });
    }

    const isShowPresent = await Shows.findOne({
      movie: movieId,
      showDate,
      showTime,
    });
    if (isShowPresent) {
      return res.status(400).json({
        message: "Show already present",
        success: false,
        error: true,
      });
    }

    const newShow = new Shows({
      movie: movieId,
      showDate,
      showTime,
      showPrice,
      occupiedSeats,
    });

    await newShow.save();

    res.status(200).json({
      data: newShow,
      message: "New show added successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
      success: false,
      error: true,
    });
  }
});

showRouter.get("/show/:mId", async (req, res) => {
  try {
    const {mId} = req.params;

    const show = await Shows.find({ movie: mId }).populate("movie");

    res.status(200).json({
      data: show,
      message: "fetched shows successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
      success: false,
      error: true,
    });
  }
});

module.exports = { showRouter };
