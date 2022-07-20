var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const jwtStaratgy = require("passport-jwt").Strategy;
const Extractjwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User = require("./model/User");

// const config = require("./config.js");
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// exports.getToken = function (user) {
//   return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
// };

// const opts = {};
// opts.jwtFromRequest = Extractjwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = config.secretKey;

// exports.jwtPassport = passport.use(
//   new jwtStaratgy(opts, (jwt_payload, done) => {
//     console.log("JWT payload: ", jwt_payload);
//     User.findOne({ _id: jwt_payload._id }, (err, user) => {
//       if (err) {
//         return done(err, false);
//       } else if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     });
//   })
// );

// exports.varifyUser = passport.authenticate("jwt", { session: false });
