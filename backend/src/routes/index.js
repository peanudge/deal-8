import express from "express";
import apiRouter from "./api/index.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.use("/api", apiRouter);

export default router;
