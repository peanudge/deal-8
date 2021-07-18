import AccountStore from "../../../model/Account/Store/InMemmoryAccountStore.js";

const accountStore = new AccountStore();

const signIn = async (req, res) => {
  const { username } = req.body;
  const account = await accountStore.getAccount({ username });
  if (account === null) {
    return res.json({ success: false });
  }

  req.session.username = username;
  req.session.save(() => {
    return res.json({ success: true });
  });
};

const signUp = async (req, res) => {
  const { username, location } = req.body;

  if ((await accountStore.getAccount(username)) !== null) {
    return res.json({ success: false }); // overlap
  }

  const account = await accountStore.createAccount({ username, location });
  if (account) {
    return res.json({ success: true });
  }
  return res.json({ success: false });
};

const authApi = {
  signIn,
  signUp,
  signOut: (req, res) => {
    req.session.destroy((err) => {
      return res.json({ success: true });
    });
  },
};

export default authApi;
