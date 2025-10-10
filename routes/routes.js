const { Router } = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const appController = require("../controllers/appController");
const authController = require("../controllers/authController");
const fileController = require("../controllers/fileController");
const passport = require("passport");
const validators = require("../utils/validators");
const Protected = authController.protected;
const userFolder = authController.userFolderPermission;

// Instantiate the app
const router = Router();

// Home & User routes
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", Protected, appController.profileGet);
router.get("/edit-profile", Protected, appController.profileEdit);
router.post("/edit-profile", Protected, appController.updateProfile);

router.get("/resetDb", appController.resetDb);

// File routes
router.get("/myfiles", Protected, fileController.getMyFiles);
router.get("/upload", Protected, fileController.getUploadFile);
router.post(
  "/upload",
  Protected,
  upload.single("uploaded_file"),
  fileController.postUploadFile
);
router.get("/newfolder", Protected, fileController.getNewFolder);
router.get("/:folderid", userFolder, fileController.getFolder);
router.post("/createfolder", Protected, fileController.postNewFolder);
router.get("/edit/:folderid", userFolder, fileController.getEditFolder);
router.get("/viewfile/:file_id", Protected, fileController.viewFile);
router.post("/edit-folder", userFolder, fileController.postEditFolder);
router.post("/edit-file", Protected, fileController.editFile);
router.post("/delete-folder", userFolder, fileController.deleteFolder);
router.post("/delete-file", Protected, fileController.deleteFile);

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
