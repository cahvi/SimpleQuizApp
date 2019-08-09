const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignUser(user) {
  const EIGHT_HOURS = 60 * 60 * 8;
  return jwt.sign(
    { username: user.username, password: user.password },
    config.authentication.jwtSecret,
    {
      expiresIn: EIGHT_HOURS
    }
  );
}

module.exports = {
  register(req, res) {
    const user = new User(req.body);

    user
      .save()
      .then(result => {
        res.send({
          user: result.toJSON()
        });
        console.log(`${result} created!`);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send({
          error: 'Username already taken'
        });
      });
  },
  login(req, res) {
    const { username, password } = req.body;

    User.findOne({ username: username })
      .exec()
      .then(user => {
        if (!user) {
          return res.status(403).send({
            error: 'The username does not exist'
          });
        }

        if (user) {
          const isPasswordValid = user.comparePassword(password);
          if (!isPasswordValid) {
            return res.status(403).send({
              error: 'Invalid password'
            });
          }
        }

        res.status(200).send({
          user: user.toJSON(),
          token: jwtSignUser(user.toJSON())
        });
      })
      .catch(err => {
        if (err) {
          return res.status(500).send({
            error: 'An error has occured'
          });
        }
      });
  },
  getuser(req, res) {
    res.send(req.user);
  }
};
