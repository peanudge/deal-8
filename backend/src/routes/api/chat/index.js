import express from "express";
import authMiddleware from "../../../middlewares/auth.js";

import MySQLAccountStore from "../../../model/Account/Store/MySQLAccountStore.js";
import MySQLProductStore from "../../../model/Product/Store/MySQLProductStore.js";

const accountStore = MySQLAccountStore;
const productStore = MySQLProductStore;

const router = express.Router();

router.get("/rooms", authMiddleware, (req, res) => {
  // 자신이 가진 room 들의 정보를 불러와야함
  const username = req.session.username;
});

router.get("/product/rooms", authMiddleware, (req, res) => {
  // example product/rooms?productid=1
});

export default router;
