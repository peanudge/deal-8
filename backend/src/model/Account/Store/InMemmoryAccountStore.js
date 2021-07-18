import AbstractAccountStore from "../AbstractAccountStore.js";
import Account from "../Account.js";

const accountData = [
  new Account("woowahan", ["역삼동"]),
  new Account("testtest", ["출동"]),
  new Account("testuser", ["반동"]),
];

export default class InMemoryAccountStore extends AbstractAccountStore {
  async getAccount(username) {
    const account = accountData.find(
      (account) => account.username === username
    );
    if (!account) return null;
    return account;
  }

  async createAccount({ username, locations }) {
    const isExistAccount = accountData.find(
      (account) => account.username === username
    );

    if (isExistAccount) {
      return null;
    }

    const newAccount = new Account(username, locations);
    accountData.push(newAccount);
    return newAccount;
  }
}
