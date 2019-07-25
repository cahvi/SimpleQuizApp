const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  username: String
});

module.exports = mongoose.model('User', userSchema);
