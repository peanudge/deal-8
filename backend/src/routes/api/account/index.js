import express from "express";
import {
  BAD_REQUEST,
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
} from "../../../util/HttpStatus.js";

import authMiddleware from "../../../middlewares/auth.js";

import AccountStore from "../../../model/Account/Store/MysqlAccountStore.js";
import ProductStore from "../../../model/Product/Store/MySQLProductStore.js";

const accountStore = new AccountStore();
const productStore = new ProductStore();

const router = express.Router();

router.use("", authMiddleware);

router.get("/me", async (req, res) => {
  const account = await accountStore.getAccount(req.session.username);
  res.json({ isAuth: true, account });
});

router.post("/me/location", async (req, res) => {
  const { location } = req.body;

  const username = req.session["username"];
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
    res.status(BAD_REQUEST).json({
      success: false,
      error: "지역 정보는 최대 2개까지만 등록할 수 있습니다.",
    });
  }
});

router.delete("/me/location", async (req, res) => {
  const { location } = req.query;
  const username = req.session["username"];
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
    res
      .status(SUCCESS_STATUS)
      .json({ success: true, account: affectedAccount });
  } else {
    res.status(BAD_REQUEST).json({
      success: false,
      error: "지역 정보는 최소한 하나는 있어야합니다.",
    });
  }
});

router.get("/me/interest", async (req, res) => {
  if (!req.session["username"]) {
    res
      .status(UNAUTHORIZED_STATUS)
      .json({ success: false, error: "로그인이 필요합니다." });
    return;
  }

  const username = req.session["username"];
  const products = await productStore.getInterestProducts(username);
  res.status(SUCCESS_STATUS).json({
    success: true,
    products,
  });
});

router.post("/me/interest", async (req, res) => {
  const username = req.session["username"];
  const { productId } = req.query;
  if (!productId) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: "productId 값이 필요합니다.",
    });
  }

  const isDuplicate = await productStore.isInterestProduct(username, productId);
  if (isDuplicate) {
    res
      .status(BAD_REQUEST)
      .json({ success: false, error: "이미 관심 목록에 추가되어있습니다." });
    return;
  }

  const productIdAsNumber = Number(productId);
  const result = await productStore.addInterestProduct(
    username,
    productIdAsNumber
  );
  if (result) {
    res.status(SUCCESS_STATUS).json({ success: true });
  } else {
    res.status(BAD_REQUEST).json({ success: false });
  }
});

router.delete("/me/interest", async (req, res) => {
  const username = req.session["username"];
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
    res.status(SUCCESS_STATUS).json({ success: true });
  } else {
    res.status(BAD_REQUEST).json({ success: false });
  }
});

router.get("/me/product", async (req, res) => {
  if (!req.session["username"]) {
    res
      .status(UNAUTHORIZED_STATUS)
      .json({ success: false, error: "로그인이 필요합니다." });
    return;
  }

  const username = req.session["username"];
  const products = await productStore.getOwnProducts(username);
  res.status(SUCCESS_STATUS).json({
    success: true,
    products,
  });
});
export default router;
