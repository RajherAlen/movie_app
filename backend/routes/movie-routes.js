const express = require("express");
const movieListContollers = require("../controllers/movieListContollers");

const router = express.Router();

router.get("/:userId", movieListContollers.movieList);
router.post("/:userId", movieListContollers.addToMovieList);

module.exports = router;