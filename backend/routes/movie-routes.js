const express = require("express");
const { check } = require("express-validator");
const movieListContollers = require("../controllers/movieListContollers");

const router = express.Router();

router.get("/", movieListContollers.movieList);
router.post("/", movieListContollers.addToMovieList);

module.exports = router;