const express = require("express");
const Movies = require("../models/movie");
const { validateMovieData } = require("../utils/validate");
const movieRouter = express.Router();

movieRouter.get("/movies", async (req, res) => {
  try {
    const movies = await Movies.find();

    res.status(200).json({
      data: movies,
      message: "fetched movies successfully",
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

movieRouter.post("/addMovie", async (req, res) => {
  try {
    const {
      movieName,
      movieDescription,
      movieImg,
      genres,
      releaseDate,
      originalLanguage,
      runtime,
      casts,
    } = req.body;

    //   validateMovieData(req)

    const isMoviePresent = await Movies.findOne({ movieName});
    if (isMoviePresent) {
      return res.status(400).json({
        message: "Movie already present",
        success: false,
        error: true,
      });
    }

    const movie = new Movies({
      movieName,
      movieDescription,
      movieImg,
      genres,
      releaseDate,
      originalLanguage,
      runtime,
      casts,
    });

    await movie.save();

    res.status(200).json({
      data: movie,
      message: "movie added successfully",
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

module.exports = { movieRouter };
