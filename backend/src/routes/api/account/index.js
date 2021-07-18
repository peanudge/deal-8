import express from "express";

import AccountStore from "../../../model/Account/Store/InMemmoryAccountStore.js";
const accountStore = new AccountStore();

const router = express.Router();

router.get("/me", async (req, res) => {
  if (req.session["username"]) {
    const account = await accountStore.getAccount(req.session.username);
    res.json({ isAuth: true, account });
  } else {
    res.json({ isAuth: false });
  }
});

export default router;
