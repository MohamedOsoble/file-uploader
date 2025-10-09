const { Router } = require("express");
const appController = require("../controllers/appController");
const authController = require("../controllers/authController");
const fileController = require("../controllers/fileController");
const passport = require("passport");
const validators = require("../utils/validators");
const Protected = authController.protected;

// Instantiate the app
const router = Router();

// Home & User routes
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", Protected, appController.profileGet);
router.get("/myfiles", Protected, fileController.getMyFiles);
router.get("/upload", Protected, fileController.getUploadFile);
router.post("/upload", Protected, fileController.postUploadFile);

// User auth routes
router.get("/login", authController.loginGet);
router.get("/login-success", authController.loginSuccess);
router.get("/login-failure", authController.loginFailure);
router.get("/register", authController.registerGet);
router.get("/register-success", authController.registerSuccess);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "/login-success",
  })
);
router.post(
  "/register",
  validators.registrationValidator,
  authController.registerPost
);
router.get("/logout", authController.logoutGet);

// File uploader routes

module.exports = router;
