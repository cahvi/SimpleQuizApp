const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  });
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
            message: 'The username does not exist'
          });
        }

        if (user) {
          const isPasswordValid = user.comparePassword(password);
          if (!isPasswordValid) {
            return res.status(403).send({
              message: 'Invalid password'
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
            message: 'An error has occured'
          });
        }
      });
  }
};
