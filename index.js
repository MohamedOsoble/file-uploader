// Imports
const express = require("express");
const path = require("node:path");
const Router = require("./routes/routes");
const expressSession = require("express-session");
const passport = require("passport");

// Instantiate the app and load variables
const app = express();
require("dotenv").config();
// require("./utils/passportUtils");

// Express configuration
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Set up session

// Set up passport auth

// pass User around

// Set up routes
app.use(Router);

// Start app
const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
    throw error;
  }
  console.log(`Express app is listening on port ${PORT}!`);
});
