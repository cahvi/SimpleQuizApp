const passport = require('passport');

module.exports = function(req, res, next) {
  passport.authenticate('jwt', function(err, user) {})(req, res, next);
};
