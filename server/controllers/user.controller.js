const { hashSync, compareSync } = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });

  newUser
    .save()
    .then((x) => {
      res.status(200).json({
        success: true,
        message: "User created successfully!",
        data: {
          id: x._id,
          username: x.username,
        },
      });
    })
    .catch((err) => {
      res.status(401).json({
        success: false,
        message: "Something went wrong",
        data: err,
      });
    });
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "No user Found",
        });
      }
      if (!compareSync(req.body.password, user.password)) {
        return res.status(401).json({
          success: false,
          message: "Incorrect Password",
        });
      }
      const payload = {
        username: user.username,
        id: user._id,
      };
      const token = jwt.sign(payload, "Complex Secret String", {
        expiresIn: "1d",
      });
      return res.status(200).json({
        success: true,
        message: "Logged in Successfully!",
        token: token,
      });
    })
    .catch((err) => {
      next(err);
    });
});
module.exports = router;
