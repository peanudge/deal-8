import express from "express";
import {
  BAD_REQUEST,
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
} from "../../../util/HttpStatus.js";
import AccountStore from "../../../model/Account/Store/InMemmoryAccountStore.js";
import MysqlAccountStore from "../../../model/Account/Store/MysqlAccountStore.js";

const accountStore = new AccountStore();
const mysqlAccountStore = new MysqlAccountStore();

const router = express.Router();

router.get("/me", async (req, res) => {
  if (req.session["username"]) {
    const account = await mysqlAccountStore.getAccount(req.session.username);
    res.json({ isAuth: true, account });
  } else {
    res.json({ isAuth: false });
  }
});

router.post("/me/location", async (req, res) => {
  const { location } = req.body;

  if (req.session["username"]) {
    const username = req.session["username"];
    const account = await accountStore.getAccount(username);

    const originLocation = account.locations.find((l) => location === l);
    if (originLocation) {
      res.status(SUCCESS_STATUS).json({ success: true, account });
    } else if (account.locations.length < 2) {
      const account = await accountStore.addLocation(username, location);
      res.status(SUCCESS_STATUS).json({ success: true, account });
    } else {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "지역 정보는 최대 2개까지만 등록할 수 있습니다.",
      });
    }
  } else {
    res
      .status(UNAUTHORIZED_STATUS)
      .json({ success: false, error: "로그인이 필요합니다." });
  }
});

router.delete("/me/location", async (req, res) => {
  const { location } = req.query;
  if (req.session["username"]) {
    const username = req.session["username"];
    const account = await accountStore.getAccount(username);
    if (account.locations.length >= 1) {
      const account = await accountStore.removeLocation(username, location);
      res.status(SUCCESS_STATUS).json({ success: true, account });
    } else {
      res.status(BAD_REQUEST).json({
        success: false,
        error: "지역 정보는 최소한 하나는 있어야합니다.",
      });
    }
  } else {
    res
      .status(UNAUTHORIZED_STATUS)
      .json({ success: false, error: "로그인이 필요합니다." });
  }
});

export default router;
