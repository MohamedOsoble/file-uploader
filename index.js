// Imports
const express = require("express");
const path = require("node:path");
const Router = require("./routes/routes");
const expressSession = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("./generated/prisma");

// Instantiate the app and load variables
const app = express();
require("dotenv").config();
require("./utils/passportUtils");

// Express configuration
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Set up session

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Set up passport auth
app.use(passport.initialize());
app.use(passport.session());
// pass User around
app.use(function (req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }

  next();
});
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
