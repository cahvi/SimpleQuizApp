const AuthenticationController = require('./controllers/AuthenticationController');
const TestController = require('./controllers/TestController');
const passport = require('passport');
const passportService = require('./passport');

passport.use('jwt', passportService.jwtLogin);

const isAuthenticated = passport.authenticate('jwt', { session: false });

module.exports = app => {
  app.get('/api/tests', isAuthenticated, TestController.index);
  app.post('/api/tests/access', isAuthenticated, TestController.access);
  app.get('/api/tests/:testId', isAuthenticated, TestController.show);
  app.post('/api/tests/:testId', isAuthenticated, TestController.sendanswer);
  app.post('/api/tests', isAuthenticated, TestController.post);

  app.get(
    '/api/testprogress/:testId',
    isAuthenticated,
    TestController.testprogress
  );
  app.post(
    '/api/testprogress/post',
    isAuthenticated,
    TestController.testprogress_post
  );

  app.post('/api/register', AuthenticationController.register);
  app.post('/api/login', AuthenticationController.login);
  app.get('/api/getuser', isAuthenticated, AuthenticationController.getuser);
};
