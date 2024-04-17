const express = require("express");
const router = express.Router();
const Book = require("../models/book.model");
const { generateCrudMethods } = require("../services/");
const { validateDbId, raise404Error } = require("../middlewares/");
const bookCrud = generateCrudMethods(Book);
const passport = require("passport");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    // console.log("check 1");
    bookCrud
      .getAll()
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err));
  }
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateDbId,
  (req, res, next) => {
    bookCrud
      .getById(req.params.id)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          raise404Error(req, res);
        }
      })
      .catch((err) => next(err));
  }
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    //   console.log(req.body);
    const newRecord = {
      title: req.body.title,
      genre: req.body.genre,
      author: req.body.author,
      pages: req.body.pages,
      rating: req.body.rating,
      price: req.body.price,
      favorite: req.body.favorite,
      archive: req.body.archive,
      desc: req.body.desc,
      createdTime: req.body.createdTime,
      lastViewedTime: req.body.lastViewedTime,
    };
    bookCrud
      .create(newRecord)
      .then((data) => res.status(201).json(data))
      .catch((err) => next(err));
  }
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateDbId,
  (req, res, next) => {
    const updatedRecord = {
      title: req.body.title,
      genre: req.body.genre,
      author: req.body.author,
      pages: req.body.pages,
      rating: req.body.rating,
      price: req.body.price,
      favorite: req.body.favorite,
      archive: req.body.archive,
      desc: req.body.desc,
      createdTime: req.body.createdTime,
      lastViewedTime: req.body.lastViewedTime,
    };
    bookCrud
      .update(req.params.id, updatedRecord)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          raise404Error(req, res);
        }
      })
      .catch((err) => next(err));
  }
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateDbId,
  (req, res, next) => {
    bookCrud
      .delete(req.params.id)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          raise404Error(req, res);
        }
      })
      .catch((err) => next(err));
  }
);

module.exports = router;
