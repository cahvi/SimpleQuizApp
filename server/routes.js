const AuthenticationController = require('./controllers/AuthenticationController');
const TestController = require('./controllers/TestController');
const passport = require('passport');
const passportService = require('./passport');

passport.use('jwt', passportService.jwtLogin);

const isAuthenticated = passport.authenticate('jwt', { session: false });

//const isAuthenticated = require('./policies/isAuthenticated');

module.exports = app => {
  app.get(
    '/securepage',
    passport.authenticate('jwt', { session: false }),
    TestController.index
  );

  app.post('/register', AuthenticationController.register);

  app.post('/login', AuthenticationController.login);

  app.get('/getuser', isAuthenticated, AuthenticationController.getuser);
};
