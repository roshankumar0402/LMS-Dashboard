const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const User = require("../models/user.model");
const passport = require("passport");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Complex Secret String";

const ObjectID = require("mongoose").Types.ObjectId;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const id = new ObjectID(jwt_payload.id);
    // const wrongID = new ObjectID("65fa8fcc7d5b92755d8db11d") + "AA";
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        return done(null, user);
      } else {
        err = new Error("Book not Found");
        return done(err, false);
      }
    } catch (err) {
      err = new Error("Object ID is invalid");
      return done(err, false);
    }
  })
);

//   return done(null, false);

//     function (err, user) {
//   console.log("USER", user);
//   if (err) {
//     return done(err, false);
//   }
//   if (user) {
//     return done(null, user);
//   } else {
//     return done(null, false);
//   }
// });
