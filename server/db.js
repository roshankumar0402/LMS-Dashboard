const mongoose = require("mongoose");

const dbUri = "mongodb://localhost:27017/lms_dashboard";

const connectDb = () => {
  return mongoose.connect(dbUri);
};

module.exports = connectDb;
