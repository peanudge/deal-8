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

  async createAccount({ username, location }) {
    const isExistAccount = accountData.find(
      (account) => account.username === username
    );

    if (isExistAccount) {
      return null;
    }

    const newAccount = new Account(username, [location]);
    accountData.push(newAccount);
    return newAccount;
  }

  async addLocation(username, location) {
    const account = accountData.find((account) => account.username == username);
    account.locations.push(location);
    return account;
  }

  async removeLocation(username, location) {
    const account = accountData.find((account) => account.username == username);
    account.locations = account.locations.filter((l) => l !== location);
    return account;
  }
}
