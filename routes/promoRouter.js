const express = require("express");
const promoRouter = express.Router();
const Promotions = require("../model/promotions");

promoRouter
  .get("/", (req, res, next) => {
    Promotions.find({})
      .then((promotions) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .post("/", (req, res, next) => {
    Promotions.create(req.body)
      .then((promotions) => {
        console.log("Created Promotions:" + promotions);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);
      })
      .catch((err) => next(err));
  })
  .put("/", (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promotion");
  })
  .delete("/", (req, res, next) => {
    Promotions.remove()
      .then((resp) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(resp);
      })
      .catch((err) => next(err));
  })
  .get("/:promoId", (req, res, next) => {
    Promotions.findById(req.params.promoId)
      .then((promotion) => {
        res.statusCode = 200;
        res.json(promotion);
      })
      .catch((err) => next(err));
  })
  .post("/:promoId", (req, res, next) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /promotion/" + req.params.promoId);
  })
  .put("/:promoId", (req, res, next) => {
    Promotions.findByIdAndUpdate(
      req.params.promoId,
      { $set: req.body },
      { new: true }
    )
      .then(
        (promotion) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(promotion);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .delete("/:promoId", (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
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

module.exports = promoRouter;
