const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDb = require("./db.js");
const genreRoutes = require("./controllers/genre.controller.js");
const bookRoutes = require("./controllers/book.controller.js");
const userRoutes = require("./controllers/user.controller.js");
const { errorHandler } = require("./middlewares/");
const passport = require("passport");
const app = express();
require("./auth/passport.js");

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));
app.use(passport.initialize());
app.use("/api/users", userRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/books", bookRoutes);
app.use(errorHandler);

connectDb()
  .then(() => {
    console.log("DB connected");
    app.listen(3000, () => console.log("Server Started at 3000..."));
  })
  .catch((err) => console.log(err));
