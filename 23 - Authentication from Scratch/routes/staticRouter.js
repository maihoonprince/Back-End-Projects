const express = require("express");
const URL = require("../models/url"); // Import the URL model here

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.redirect("/login")
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
        urls: allUrls,
    });
});

router.get("/signup", (req, res) => {
    return res.render("signup");
});

router.get("/login", (req, res) => {
    return res.render("login");
});


module.exports = router;
