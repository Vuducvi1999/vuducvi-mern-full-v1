const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Item = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// export default
module.exports = mongoose.model("item", Item);
