import AccountStore from "../../../model/Account/Store/InMemmoryAccountStore.js";
import express from "express";
const accountStore = new AccountStore();

const router = express.Router();

router.post("/signin", async (req, res) => {
  const { username } = req.body;
  const account = await accountStore.getAccount(username);
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
    return res.json({ success: false });
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
