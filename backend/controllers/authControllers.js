const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../db");

const loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Check if the user already exists in the database
		// Check if the user already exists in the database
		const existingUser = await checkIfUserExists({ username });

		if (existingUser[0].length === 0) {
			console.log("User not exists");
			res.status(400).json({ error: "User not exists" });
		} else {
			const isValidPassword = await bcrypt.compare(password, existingUser[0][0].password);
			const loggedUser = existingUser[0][0];
			const userToken = await generateToken(username);
			
			if(isValidPassword) {
				res.json({...loggedUser, userToken });
			} else {
				res.status(400).json({ error: "Something went wrong please try again!" });
			}
		}
	} catch (err) {
		console.error("Error: " + err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const registerUser = async (req, res, next) => {
	try {
		const { email, username, password } = req.body;

		const existingUser = await checkIfUserExists({ email, username });

		if (existingUser[0].length > 0) {
			res.status(400).json({ error: "User already exists" });
		} else {
			const hashedPassword = await bcrypt.hash(password, 12);

			const newUser = await createUser({ ...req.body, hashedPassword });

			res.json(newUser);
		}
	} catch (err) {
		console.error("Error: " + err.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Function to generate a JWT token
const generateToken = (userId) => {
	return jwt.sign({ userId }, "secret_dont_share", {
		expiresIn: "1h"
	});
};

const createUser = (props) => {
	const { firstName, lastName, email, username, hashedPassword } = props;
	return db.query(
		"INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)",
		[firstName, lastName, email, username, hashedPassword]
	);
};

const checkIfUserExists = (props) => {
	const { username, email } = props;

	return db.query("SELECT * FROM users WHERE username = ? OR email = ?", [
		username,
		email
	]);
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
