// Imports
const validators = require("../utils/validators");
const { all } = require("../routes/routes");
const { PrismaClient } = require("../generated/prisma");

// Instantiate Prisma Client
const Prisma = new PrismaClient();

module.exports.homeGet = async function (req, res, next) {
  return res.render("index");
};

module.exports.registerGet = async function (req, res, next) {
  return res.render("register");
};

module.exports.profileGet = async function (req, res, next) {
  return res.render("profile");
};

module.exports.profileEdit = async function (req, res, next) {
  return res.render("edit-profile");
};

module.exports.updateProfile = async function (req, res, next) {
  const user = await Prisma.user.update({
    where: { id: req.user.id },
    data: {
      email: req.body.email,
    },
  });

  await Prisma.profile.update({
    where: { id: user.profileId },
    data: {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      age: parseInt(req.body.age),
      bio: req.body.bio,
    },
  });
  return res.redirect("/profile");
};

module.exports.resetDb = async function (req, res, next) {
  await Prisma.folder.deleteMany({});

  await Prisma.user.deleteMany({});
  await Prisma.profile.deleteMany({});
  return res.redirect("/");
};
