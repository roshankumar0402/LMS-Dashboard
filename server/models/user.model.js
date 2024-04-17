const mongoose = require("mongoose");
const userModel = mongoose.model(
  "User",
  {
    username: { type: String },
    password: { type: String },
  },
  "users"
);
module.exports = userModel;
