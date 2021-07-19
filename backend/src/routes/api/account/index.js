import express from "express";
import {
  BAD_REQUEST,
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
} from "../../../util/HttpStatus.js";
import authMiddleware from "../../../middlewares/auth.js";
import MysqlAccountStore from "../../../model/Account/Store/MysqlAccountStore.js";
const accountStore = new MysqlAccountStore();

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

export default router;
