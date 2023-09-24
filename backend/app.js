const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const authRoutes = require("./routes/auth-routes")
const movieListRoutes = require("./routes/movie-routes")

const jwt = require("jsonwebtoken");

const app = express();

// midleware
// app.use(cors());
app.use(bodyParser.json()); // req.body

app.listen(5000, () => {
	console.log("Server has started on port 5000");
});

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*"); // * ALL
	// res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-Width, Content-Type, Accept, Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
	next();
});

app.use("/auth", authRoutes);
app.use("/movie-list", movieListRoutes);