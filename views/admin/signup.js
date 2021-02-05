const layout = require("./layout");

module.exports = ({ req }) => {
  return layout({
    content: `
    <div>
      Your id is: ${req.session.userId}
      <form method="POST">
        <input placeholder="Email" name="email" type="email"/>
        <input placeholder="Password" name="password" type="password"/>
        <input placeholder="Confirm Password" name="passwordConfirmation"    type="password"/>
        <button>Sign Up</button>
      </form>
    </div>
  `,
  });
};
