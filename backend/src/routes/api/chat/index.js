import express from "express";
import authMiddleware from "../../../middlewares/auth.js";

import MySQLAccountStore from "../../../model/Account/Store/MySQLAccountStore.js";
import MySQLProductStore from "../../../model/Product/Store/MySQLProductStore.js";
import InMemmoryChatStore from "../../../model/Chat/Store/InMemmoryChatStore.js";

import { INTERNAL_SERVER_ERROR_STATUS } from "../../../util/HttpStatus.js";

const accountStore = MySQLAccountStore;
const productStore = MySQLProductStore;
const chatStore = InMemmoryChatStore;

const router = express.Router();

router.get("/rooms", authMiddleware, (req, res) => {
  // 자신이 가진 room 들의 정보를 불러와야함
  const username = req.session.username;
});

router.get("/product/rooms", authMiddleware, (req, res) => {
  // example product/rooms?productid=1
  const { productId } = req.query;
  try {
    const username = req.session.username;
    const rooms = chatStore.getRoomsByProductId(productId, username);
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR_STATUS);
  }
});

export default router;
