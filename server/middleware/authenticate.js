const { User } = require("../models/user");

function authenticate(req, res, next) {
  const token = req.header("x-auth");

  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject("Failed to authorize");
      }

      req.user = user;
      req.token = token;
      next();
    })
    .catch((e) => res.status(401).send());
}

module.exports = { authenticate };
