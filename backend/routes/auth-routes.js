const express = require("express");
const { check } = require("express-validator");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

const loginValidation = [
	check("username")
		.trim()
		.isLength({ min: 4, max: 16 })
		.withMessage("Username must be between 4 to 16 characters"),
	check("password")
		.trim()
		.isLength({ min: 8, max: 16 })
		.withMessage("Password must be between 4 to 16 characters")
];

const registerValidation = [
	check("firstName").trim(),
	check("lastName").trim(),
	check("email").normalizeEmail().isEmail(),
	...loginValidation
];

router.post("/login", loginValidation, authControllers.loginUser);
router.post("/register", registerValidation, authControllers.registerUser);

module.exports = router;
