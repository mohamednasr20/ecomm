const usersRepo = require("../../repositories/users");
const { check } = require("express-validator");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .custom(async (email) => {
      const existingUsers = await usersRepo.getOneBy({ email });
      if (existingUsers) {
        throw new Error("Email in use");
      }
    }),

  requirePassword: check("password").trim().isLength({ min: 4, max: 20 }),

  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 20 })
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("passwords must match");
      }
    }),
};
