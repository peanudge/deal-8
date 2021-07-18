import express from "express";
import apiRouter from "./api/index.js";

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "INDEX" });
});

router.use("/api", apiRouter);

export default router;
