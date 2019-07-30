const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  index(req, res) {
    const user = req.user;

    User.findOne({ _id: user._id })
      .exec()
      .then(user => {
        if (user) {
          console.log('löytyi');
        } else {
          console.log('ei löytynyt');
        }
      });
  }
};
