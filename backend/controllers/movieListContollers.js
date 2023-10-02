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

	const movieExistsQuery = await db.query(
		"SELECT COUNT(*) AS movieCount FROM movie_list WHERE movie_id = ? AND user_id = ?",
		[id, userId]
	);

	const isMovieExists = movieExistsQuery[0][0].movieCount;

	if (isMovieExists > 0) {
		return res
			.status(409)
			.json({ error: "Movie is already added to watchlist!" });
	}

	const newMovie = await db.query(
		"INSERT INTO movie_list (title, poster_path, vote_average, movie_id, user_id, overview) VALUES (?, ?, ?, ?, ?, ?)",
		[
			title,
			poster_path,
			vote_average,
			id,
			userId,
			overview ? overview.slice(0, 255) : "OVERVIEW"
		]
	);

	res.json(newMovie);
};

exports.movieList = movieList;
exports.addToMovieList = addToMovieList;
