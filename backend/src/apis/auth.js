import Account from "../model/Account/Account.js";
import AccountStore from "../model/Account/Store/InMemmoryAccountStore.js";
import session from "express-session";

const accountStore = new AccountStore();

const signIn = async (req, res) => {
  console.log("user requested");
  const { username } = req.body;
  const accountDTO = new Account(username);
  const account = await accountStore.getAccount(accountDTO);
  return res.json({ account });
};

const authApi = {
  signIn: (req, res) => {
    signIn(req, res);
  },
  signUp: () => {},
  signOut: () => {},
};

export default authApi;
