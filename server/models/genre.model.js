const mongoose = require("mongoose");
const genreModel = mongoose.model(
  "Genre",
  {
    name: { type: String },
    icon: { type: String },
  },
  "genres"
);
module.exports = genreModel;
