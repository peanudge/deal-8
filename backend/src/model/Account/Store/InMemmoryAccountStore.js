import AbstractAccountStore from "../AbstractAccountStore.js";
import AccountDTO from "../Account.js";

const accounts = ["testuser", "woowauser", "testtest"];
const locations = [
  { username: "testuser", location: "범박동" },
  { username: "woowauser", location: "역삼동" },
  { username: "testtest", location: "출동" },
  { username: "testuser", location: "반동" },
];

export default class InMemoryAccountStore extends AbstractAccountStore {
  async getAccount({ username }) {
    if (accounts.includes(username)) {
      return new AccountDTO(username);
    }
    return null;
  }

  async addLocation({ username, location }) {

    const isOverlapLocation = locations.find(locationObject => {
      if (locationObject.username === username && locationObject.location === location) {
        return true
      }
    })

    if (isOverlapLocation) {
      return false;
    }
    const newData = { username: username, location: location };
    
    locations.push(newData);
    return true;
  }

  async createAccount({ username, location }) {
    console.log("create account")
    if (accounts.includes(username) === -1) {
    console.log("include name")
      return false;
    }
    
    
    if (await this.addLocation({ username, location })) {
      return true;
    }
    return false;
  }
}
