var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const User = require("../model/User");
const authenticate = require("../authenticate");
const passport = require("passport");
/* GET users listing. */
router.use(bodyParser.json());
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        var err = new Error("User" + req.body.username + "allready exist!");
        err.status = 403;
        next(err);
      } else {
        return User.create({
          username: req.body.username,
          password: req.body.password,
        });
      }
    })
    .then(
      (user) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ status: "Registration Successful!", user: user });
        console.log(req.session);
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  console.log(req.user);
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({
    success: true,
    token: token,
    status: "You are successfully logged in!",
  });
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});
module.exports = router;
