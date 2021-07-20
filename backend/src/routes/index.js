import express from "express";
import apiRouter from "./api/index.js";

import { upload } from "../app.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "INDEX" });
});

router.get("/file", function (req, res, next) {
  res.render("file", { images: pathList });
});

router.post("/upload", function (req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      res.render("file");
    } else {
      const pathList = req.files.map((file) => file.path);
      res.render("file", { images: pathList });
    }
  });
});

router.use("/api", apiRouter);

export default router;
