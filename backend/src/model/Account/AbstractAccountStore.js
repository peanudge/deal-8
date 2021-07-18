export default class AbstractProductStore {
  async getAccount(username) {}
  async createAccount({ username, locations }) {}
  async addLocation(username, location) {}
  async removeLocation(username, location) {}
}
