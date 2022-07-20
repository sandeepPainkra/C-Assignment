var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const passportLocal = require("passport-local-mongoose");

var User = new Schema({
  admin: {
    type: Boolean,
    default: false,
  },
});
User.plugin(passportLocal);
module.exports = mongoose.model("User", User);
