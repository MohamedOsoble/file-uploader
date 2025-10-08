const { Router } = require("express");
const appController = require("../controllers/appController");
const authController = require("../controllers/authController");
const fileController = require("../controllers/fileController");
const passport = require("passport");
const validators = require("../utils/validators");

// Instantiate the app
const router = Router();

// Home Routes
router.get("/", (req, res, next) => {
  res.render("index");
});

// User auth routes
router.get("/login", authController.loginGet);
router.get("/login-success", authController.loginSuccess);
router.get("/login-failure", authController.loginFailure);
router.get("/register", authController.registerGet);

// File uploader routes

module.exports = router;
