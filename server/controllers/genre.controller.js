const express = require("express");
const router = express.Router();
const Genre = require("../models/genre.model");
const { generateCrudMethods } = require("../services");
const { validateDbId, raise404Error } = require("../middlewares");
const genreCrud = generateCrudMethods(Genre);
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    genreCrud
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
    genreCrud
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
      name: req.body.name,
      icon: req.body.icon,
    };
    genreCrud
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
      name: req.body.name,
      icon: req.body.icon,
    };
    genreCrud
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
    genreCrud
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
