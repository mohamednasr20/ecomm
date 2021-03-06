const usersRepo = require("../../repositories/users");
const { check } = require("express-validator");

module.exports = {
  requireTitle: check("title")
    .trim()
    .isLength({ min: 5, max: 30 })
    .withMessage("Must be between 5 and 30 characters"),

  requirePrice: check("price")
    .trim()
    .toFloat()
    .isFloat({ min: 1 })
    .withMessage("Must be a number"),

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
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("passwords must match");
      }
    }),

  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid email")
    .custom(async (email) => {
      const user = await usersRepo.getOneBy({ email });

      if (!user) {
        throw new Error("Email is not valid");
      }
    }),
  requirePasswordValidateForUser: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const user = await usersRepo.getOneBy({ email: req.body.email });
      if (!user) {
        throw new Error("Invalid password");
      }

      const validPassword = await usersRepo.comparePasswords(
        user.password,
        password
      );
      if (!validPassword) {
        throw new Error("Invalid Passsword");
      }
    }),
};
