import AbstractAccountStore from "../AbstractAccountStore.js";
import AccountDTO from "../Account.js";
const accounts = ["testuser", "woowauser", "testtest"];

export default class InMemoryAccountStore extends AbstractAccountStore {
  async getAccount({ username }) {
    if (accounts.includes(username)) {
      return new AccountDTO(username);
    }
    return null;
  }
}
