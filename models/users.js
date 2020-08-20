const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registed_date: {
    type: Date,
    default: Date.now,
  },
});

// export default
module.exports = mongoose.model("user", User);
