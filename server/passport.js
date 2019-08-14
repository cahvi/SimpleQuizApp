const passport = require('passport');
const User = require('./models/User');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./config/config');

module.exports.jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  },
  function(jwtPayload, done) {
    User.findOne({ _id: jwtPayload._id })
      .exec()
      .then(user => {
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err, false);
      });
  }
);
