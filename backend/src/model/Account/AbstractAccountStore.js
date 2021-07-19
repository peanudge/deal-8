export default class AbstractProductStore {
  async getAccount(username) {}
  async createAccount({ username, location }) {}
  async addLocation(username, location) {}
  async removeLocation(username, location) {}
}
