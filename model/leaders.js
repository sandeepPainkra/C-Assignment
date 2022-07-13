const mongoose = require("mongoose");

const leaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  abbr: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
const Leaders = mongoose.model("Leader", leaderSchema);

module.exports = Leaders;
