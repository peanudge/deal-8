import express from "express";

import { upload } from "../app.js";

import apiRouter from "./api/index.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "INDEX" });
});

router.get("/file", function (req, res, next) {
  res.render("file", { msg: "" });
});

router.post("/upload", function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.render("file", { msg: err });
    } else {
      res.json(req.files);
    }
  });
});

router.use("/api", apiRouter);

export default router;
