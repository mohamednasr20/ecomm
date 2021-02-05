const usersRepo = require("../../repositories/users");
const express = require("express");
const signupTemplate = require("../../views/admin/signup");
const signinTemplate = require("../../views/admin/signin");

const router = express.Router();

router.get("/signup", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUsers = await usersRepo.getOneBy({ email });
  if (existingUsers) {
    return res.send("Email In Use");
  }

  if (password !== passwordConfirmation) {
    return res.send("passwords must match");
  }

  const user = await usersRepo.create({ email, password });
  req.session.userId = user.id;

  res.send("Account Created!!!");
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("You are logged out");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if (!user) {
    return res.send("Email not found !!");
  }
  const validPassword = await usersRepo.comparePasswords(
    user.password,
    password
  );

  if (!validPassword) {
    return res.send("Invalid password");
  }

  req.session.userId = user.id;
  res.send("You Are Signed In");
});

module.exports = router;
