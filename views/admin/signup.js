const layout = require("./layout");

const getError = (errors, prop) => {
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
    <div>
      Your id is: ${req.session.userId}
      <form method="POST">
        <input placeholder="Email" name="email" type="email"/>
        ${getError(errors, "email")}
        <input placeholder="Password" name="password" type="password"/>
        ${getError(errors, "password")}
        <input placeholder="Confirm Password" name="passwordConfirmation"    type="password"/>
        ${getError(errors, "passwordConfirmation")}
        <button>Sign Up</button>
      </form>
    </div>
  `,
  });
};
