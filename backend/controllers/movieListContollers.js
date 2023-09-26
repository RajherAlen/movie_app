const db = require("../db");

const movieList = async (req, res, next) => {
	const { userId } = req.params;
	const movieList = await db.query(
		"SELECT * FROM movie_list WHERE user_id = ?",
		[userId]
	);

	res.json(movieList[0]);
};

const addToMovieList = async (req, res, next) => {
	const { userId } = req.params;
	const { title, poster_path, vote_average, id, overview } = req.body;

	// TODO - CHECK IF MOVIE EXISTS IN DB

	const newMovie = await db.query(
		"INSERT INTO movie_list (title, poster_path, vote_average, movie_id, user_id, overview) VALUES (?, ?, ?, ?, ?, ?)",
		[title, poster_path, vote_average, id, userId, overview.slice(0, 255)]
	);

	res.json(newMovie);
};

exports.movieList = movieList;
exports.addToMovieList = addToMovieList;
