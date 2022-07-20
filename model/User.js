var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const passportLocal = require("passport-local-mongoose");

var User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});
User.plugin(passportLocal);
module.exports = mongoose.model("User", User);
