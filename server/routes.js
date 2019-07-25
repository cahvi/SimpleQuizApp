const mongodb = require('mongodb');
const AuthenticationController = require('./controllers/AuthenticationController');

module.exports = app => {
  app.get('/users', AuthenticationController.getUsers);

  app.post('/register', AuthenticationController.register);
};
