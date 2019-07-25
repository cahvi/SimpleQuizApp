const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
  getUsers(req, res) {
    User.find().then(result => {
      res.send(result);
    });
  },
  register(req, res) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username
    });
    user
      .save()
      .then(result => {
        res.send(result);
        console.log(`${result} created!`);
      })
      .catch(err => console.log(err));
  }
};
