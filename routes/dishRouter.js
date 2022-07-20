const express = require("express");
const Dishes = require("../model/dishModel");
const dishRouter = express.Router();
const authenticate = require("../authenticate");

dishRouter
  .route("/")
  .get((req, res, next) => {
    Dishes.find({})
      .then((dishes) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dishes);
      })
      .catch((err) => next(err));
  })
  .post(authenticate.varifyUser, (req, res, next) => {
    Dishes.create(req.body)
      .then((dish) => {
        console.log("Dish Created ", dish);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
        next();
      })
      .catch((err) => next(err));
  })
  .put(authenticate.varifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /dishes");
  })
  .delete(authenticate.varifyUser, (req, res, next) => {
    Dishes.remove({})
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });
dishRouter
  .route("/:dishId")
  .get(authenticate.varifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(authenticate.varifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /dishes/" + req.params.dishId);
  })
  .put(authenticate.varifyUser, (req, res, next) => {
    Dishes.findByIdAndUpdate(
      req.params.dishId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then(
        (dish) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(dish);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete(authenticate.varifyUser, (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
      .then(
        (resp) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resp);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

module.exports = dishRouter;
