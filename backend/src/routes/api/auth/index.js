import AccountStore from "../../../model/Account/Store/InMemmoryAccountStore.js";
import MysqlAccountStore from "../../../model/Account/Store/MysqlAccountStore.js";
import express from "express";
const accountStore = new AccountStore();
const mysqlAccountStore = new MysqlAccountStore();

const router = express.Router();

const ERROR_MSG_DUPLICATE = "중복된 아이디가 존재합니다.";

router.post("/signin", async (req, res) => {
  const { username } = req.body;
  const account = await mysqlAccountStore.getAccount(username);
  if (account) {
    req.session.username = account.username;
    req.session.save(() => {
      return res.json({ success: true });
    });
  } else {
    return res.json({ success: false });
  }
});

router.post("/signup", async (req, res) => {
  const { username, location } = req.body;
  const originAccount = await accountStore.getAccount(username);
  if (originAccount) {
    return res.json({ success: false, error: ERROR_MSG_DUPLICATE });
  }

  const newAccount = await accountStore.createAccount({ username, location });
  if (newAccount) {
    return res.json({ success: true });
  } else {
    return res.json({ success: false });
  }
});

router.post("/signout", (req, res) => {
  req.session.destroy((err) => {
    return res.json({ success: true });
  });
});

export default router;
