// Imports
const validators = require("../utils/validators");
const { all } = require("../routes/routes");

module.exports.homeGet = async function (req, res, next) {
  res.render("index");
};

module.exports.registerGet = async function (req, res, next) {
  res.render("register");
};

module.exports.profileGet = async function (req, res, next) {
  res.render("profile");
};
