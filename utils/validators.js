const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("../generated/prisma");

// Instantiate Prisma Client
const Prisma = new PrismaClient();

module.exports.registrationValidator = [
  body("username")
    .isLength({ min: 4, max: 15 })
    .withMessage("Username must be between 4 - 15 Characters long")
    .isAlphanumeric()
    .withMessage("Username must only contain letters and numbers")
    .custom(async (value) => {
      const existingUser = await Prisma.user.findFirst({
        where: { username: value },
      });
      if (existingUser) {
        throw new Error("Username already in use");
      }
    })
    .exists()
    .withMessage("Username is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Minimum password length is 8")
    .exists()
    .withMessage("Password is a required field"),
  body("conPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Passwords do not match"),
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .exists()
    .withMessage("Email field is required")
    .custom(async (value) => {
      const existingEmail = await Prisma.user.findFirst({
        where: { email: value },
      });
      if (existingEmail) {
        throw new Error("Email already in use");
      }
    })
    .withMessage("Email already in use"),
];
