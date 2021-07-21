import express from "express";
import {
  BAD_REQUEST,
  SUCCESS_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "../../../util/HttpStatus.js";

import authMiddleware from "../../../middlewares/auth.js";

import AccountStore from "../../../model/Account/Store/MySQLAccountStore.js";
import ProductStore from "../../../model/Product/Store/MySQLProductStore.js";
import ChatStore from "../../../model/Chat/Store/MySQLChatStore.js";

const accountStore = new AccountStore();
const productStore = new ProductStore();
const chatStore = new ChatStore();

const router = express.Router();

router.use("", authMiddleware);

router.get("/me", async (req, res) => {
  const account = await accountStore.getAccount(req.session.username);
  return res.json({ isAuth: true, account });
});

router.post("/me/location", async (req, res) => {
  const { location } = req.body;

  const username = req.session.username;
  const account = await accountStore.getAccount(username);

  const originLocation = account.locations.find((l) => location === l);
  if (originLocation) {
    res.status(SUCCESS_STATUS).json({ success: true, account });
  } else if (account.locations.length < 2) {
    const isAddedLocation = await accountStore.addLocation(username, location);
    if (!isAddedLocation) {
      return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ success: false });
    }
    const updatedAccount = await accountStore.getAccount(username);
    res.status(SUCCESS_STATUS).json({ success: true, account: updatedAccount });
  } else {
    return res.status(BAD_REQUEST).json({
      success: false,
      error: "지역 정보는 최대 2개까지만 등록할 수 있습니다.",
    });
  }
});

router.delete("/me/location", async (req, res) => {
  const { location } = req.query;
  const username = req.session.username;
  const account = await accountStore.getAccount(username);
  if (account.locations.length >= 1) {
    const isLocationExist = account.locations.includes(location);
    if (!isLocationExist) {
      return res.status(BAD_REQUEST).json({
        success: false,
        error: "해당 지역 정보를 보유하고 있지 않습니다.",
      });
    }
    const isDeletedLocation = await accountStore.removeLocation(
      username,
      location
    );
    if (!isDeletedLocation) {
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ success: false, error: "알 수 없는 오류입니다." });
    }
    const affectedAccount = await accountStore.getAccount(username);
    return res
      .status(SUCCESS_STATUS)
      .json({ success: true, account: affectedAccount });
  } else {
    return res.status(BAD_REQUEST).json({
      success: false,
      error: "지역 정보는 최소한 하나는 있어야합니다.",
    });
  }
});

router.get("/me/interest", async (req, res) => {
  const username = req.session.username;
  const products = await productStore.getInterestProducts(username);
  return res.status(SUCCESS_STATUS).json({
    success: true,
    products,
  });
});

router.post("/me/interest", async (req, res) => {
  const username = req.session.username;
  const { productId } = req.query;
  if (!productId) {
    return res.status(BAD_REQUEST).json({
      success: false,
      error: "productId 값이 필요합니다.",
    });
  }

  const isDuplicate = await productStore.isInterestProduct(username, productId);
  if (isDuplicate) {
    return res
      .status(BAD_REQUEST)
      .json({ success: false, error: "이미 관심 목록에 추가되어있습니다." });
  }

  const productIdAsNumber = Number(productId);
  const result = await productStore.addInterestProduct(
    username,
    productIdAsNumber
  );
  if (result) {
    return res.status(SUCCESS_STATUS).json({ success: true });
  } else {
    return res.status(BAD_REQUEST).json({ success: false });
  }
});

router.delete("/me/interest", async (req, res) => {
  const username = req.session.username;
  const { productId } = req.query;

  if (!productId) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: "productId 값이 필요합니다.",
    });
  }
  const productIdAsNumber = Number(productId);
  const result = await productStore.removeInterestProduct(
    username,
    productIdAsNumber
  );
  if (result) {
    return res.status(SUCCESS_STATUS).json({ success: true });
  } else {
    return res.status(BAD_REQUEST).json({ success: false });
  }
});

router.get("/me/product", async (req, res) => {
  const username = req.session.username;
  const products = await productStore.getOwnProducts(username);
  return res.status(SUCCESS_STATUS).json({
    success: true,
    products,
  });
});

router.get("/me/chatroom", async (req, res) => {
  const username = req.session.username;
  try {
    const chatRoomListItems = await chatStore.getChatRooms(username);
    return res
      .status(SUCCESS_STATUS)
      .json({ success: true, chatRoomListItems });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ success: false });
  }
});

export default router;
