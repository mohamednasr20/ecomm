const layout = require("./layout");
const { getError } = require("../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <form method="POST">
      <input placeholder="Email" name="email" type="email"/>
      ${getError(errors, "email")}
      <input placeholder="Password" name="password" type="password"/>
      ${getError(errors, "password")}
      <button>Sign In</button>
   </form>
    `,
  });
};
