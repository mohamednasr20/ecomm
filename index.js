const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(`
    <form method="POST">
     <input placeholder="Email" name="email" type="email"/>
     <input placeholder="Password" name="password" type="password"/>
     <input placeholder="Confirm Password" name="passwordComfrmation"    type="password"/>
     <button>Sign Up</button>
    </form>
  `);
});

app.post("/", (req, res) => {
  res.send("acount created ...");
});

app.listen(3000, () => {
  console.log("listning");
});
