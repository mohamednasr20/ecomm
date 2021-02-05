const layout = require("./layout");

module.exports = () => {
  return layout({
    content: `
    <form method="POST">
      <input placeholder="Email" name="email" type="email"/>
      <input placeholder="Password" name="password" type="password"/>
      <button>Sign In</button>
   </form>
    `,
  });
};
