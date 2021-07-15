const mongoose = require("mongoose");

const Radio = mongoose.model(
  "Radio",
  new mongoose.Schema({
    url: String,
    name: String,
    shortname: String,
  })
);

module.exports = Radio;