const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword } = require("./passwordUtils");
const { PrismaClient } = require("../generated/prisma");

// Instantiate Prisma Client
const prisma = new PrismaClient();

async function verifyCallback(username, password, done) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      return done(null, false);
    }

    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  const user = db.getUserById(userId);
  done(null, user);
});
