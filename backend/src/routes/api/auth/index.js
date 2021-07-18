import AccountStore from "../../../model/Account/Store/InMemmoryAccountStore.js";
import express from "express";
const accountStore = new AccountStore();

const router = express.Router();

router.post("/signin", async (req, res) => {
  const { username } = req.body;
  const account = await accountStore.getAccount({ username });
  if (account === null) {
    return res.json({ success: false });
  }

  req.session.username = username;
  req.session.save(() => {
    return res.json({ success: true });
  });
});

router.post("/signup", async (req, res) => {
  const { username, location } = req.body;

  if ((await accountStore.getAccount(username)) !== null) {
    return res.json({ success: false }); // overlap
  }

  const account = await accountStore.createAccount({ username, location });
  if (account) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
});

router.post("/signout", (req, res) => {
  req.session.destroy((err) => {
    return res.json({ success: true });
  });
});

export default router;
