const express = require("express");
const { handleUserSignup, handleUserLogin} = require("../controllers/user");

const router = express.Router();

// Define a POST route for user signup
router.post("/", handleUserSignup);

// For Login
router.post("/login",handleUserLogin);

module.exports = router;
