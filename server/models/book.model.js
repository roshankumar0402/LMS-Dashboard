const mongoose = require("mongoose");
const bookModel = mongoose.model(
  "Book",
  {
    title: { type: String },
    genre: { type: String },
    author: { type: String },
    pages: { type: Number },
    rating: { type: Number },
    price: { type: Number },
    favorite: { type: Boolean },
    archive: { type: Boolean },
    desc: { type: String },
    createdTime: { type: Number },
    lastViewedTime: { type: Number },
  },
  "books"
);
module.exports = bookModel;
