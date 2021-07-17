import Account from "../model/Account/Account.js";
import AccountStore from "../model/Account/Store/InMemmoryAccountStore.js";

const accountStore = new AccountStore();

const signIn = async (req, res) => {
  const { username } = req.body;
  const accountDTO = new Account(username);
  const account = await accountStore.getAccount(accountDTO);

  if (account === null) {
    return res.json({ success: false });
  }
  req.session.user = {
    username,
  };
  req.session.save(() => {
    return res.json({ success: true });
  });
};

const signUp = async (req, res) => {
  const { username, location } = req.body;
  const account = await accountStore.createAccount({username, location});
  if (account) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
};

const authApi = {
  signIn: (req, res) => {
    signIn(req, res);
  },
  signUp: (req, res) => {
    signUp(req, res);
  },
  signOut: (req,res) => {
    req.session.destroy((err) => {
      return res.json({success: true})
    })
  },
};

export default authApi;
