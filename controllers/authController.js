const { validationResult } = require("express-validator");
const genPassword = require("../utils/passwordUtils").genPassword;
const { PrismaClient } = require("../generated/prisma");

// Instantiate Prisma Client
const Prisma = new PrismaClient();

// Login Routes
module.exports.loginGet = async function (req, res, next) {
  res.render("login");
};

module.exports.loginSuccess = async function (req, res, next) {
  res.render("index");
};

module.exports.loginFailure = async function (req, res, next) {
  res.render("login", {
    error: {
      msg: "Login failed, please doublecheck your username and/or password",
    },
  });
};

// Logout Routes
module.exports.logoutGet = async function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

// Registration Routes
module.exports.registerGet = async function (req, res, next) {
  res.render("register");
};

module.exports.registerPost = async function (req, res, next) {
  const errors = validationResult(req);
  console.error(errors);
  if (!errors.isEmpty()) {
    return res.status(400).render("register", {
      errors: errors.array(),
    });
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const { salt, hash } = genPassword(req.body.password);

  const user = await Prisma.user.create({
    data: {
      username: username,
      email: email,
      hash: hash,
      salt: salt,
      profile: {
        create: {
          firstName: firstName,
          lastName: lastName,
          bio: "There's nothing here...",
        },
      },
    },
  });
  console.log(user);
  res.redirect("/register-succes");
};

module.exports.registerSuccess = async function (req, res, next) {
  res.render("/login", {
    messages: ["Registration Successful, please log in"],
  });
};
