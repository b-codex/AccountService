// const UserCompany = require("../models/EmployerModel/UserCompany");
const User = require("../models/userModel/UserModel");
// const UserProfessional = require("../models/EmployeeModel/UserProfessional");
const UserAdmin = require("../models/AdminModel/UserAdmin");
const { SECRET } = require("../config/index");
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await User.findById(payload.user_id)
        .then(async (user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
          done(null, false);
        });
    })
  );
};
module.exports = (passport) => {
  passport.use(
    new Strategy(options, async (payload, done) => {
      await UserAdmin.findById(payload.user_id)
        .then(async (user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
          done(null, false);
        });
    })
  );
};
