const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const pool = require("../db");

const movieList = async (req, res, next) => {
	const { user_id } = req.body;
	console.log("MOVIEEES");
};

const addToMovieList = async (req, res, next) => {
	const { movie_id, user_id } = req.body;

	const newMovie = await pool.query(
		"INSERT INTO movie_watch_list (movie_id, user_id) VALUES (?, ?)",
		[movie_id, user_id]
	);

	res.json(newMovie);
};

exports.movieList = movieList;
exports.addToMovieList = addToMovieList;
