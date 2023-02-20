const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 100,
    min: 10
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  dtae: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
