// Imports
const validators = require("../utils/validators");
const { all } = require("../routes/routes");
const { PrismaClient } = require("../generated/prisma");

// Instantiate Prisma Client
const Prisma = new PrismaClient();

module.exports.homeGet = async function (req, res, next) {
  res.render("index");
};

module.exports.registerGet = async function (req, res, next) {
  res.render("register");
};

module.exports.profileGet = async function (req, res, next) {
  res.render("profile");
};

module.exports.resetDb = async function (req, res, next) {
  await Prisma.folder.deleteMany({});

  await Prisma.user.deleteMany({});
  await Prisma.profile.deleteMany({});
  return res.redirect("/");
};
