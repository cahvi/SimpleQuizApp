module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: 'mongodb://localhost/test',
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'pampampam'
  }
};
