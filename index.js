const express = require("express");
const bodyParser = require("body-parser");
const usersRepo = require("./repositories/users");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <form method="POST">
     <input placeholder="Email" name="email" type="email"/>
     <input placeholder="Password" name="password" type="password"/>
     <input placeholder="Confirm Password" name="passwordConfirmation"    type="password"/>
     <button>Sign Up</button>
    </form>
  `);
});

app.post("/", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  const existingUsers = await usersRepo.getOneBy({ email });
  if (existingUsers) {
    return res.send("Email In Use");
  }

  if (password !== passwordConfirmation) {
    return res.send("passwords must match");
  }

  res.send("Account Created!!!");
});

app.listen(3000, () => {
  console.log("listning");
});
