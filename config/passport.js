const LocalStrategy = require('passport-local').Strategy;
const User = require('../src/models/user');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
  const authenticateUser = async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false, console.log('user not found'));
    }
    //match username and password
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, console.log('incorrect password'));
      }
    } catch (e) {
      return done(e);
    }
  };
  //main function
  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
