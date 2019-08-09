const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  questions: [
    {
      question: String,
      userpoints: Number,
      feedback: String,
      isDone: Boolean,
      attemps: Number,
      points: Number,
      answers: [
        {
          answer: String,
          checked: Boolean,
          correct: Boolean
        }
      ]
    }
  ],

  maxpoints: Number
});

TestSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

TestSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Test', TestSchema);
