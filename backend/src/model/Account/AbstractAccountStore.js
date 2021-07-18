export default class AbstractAccountStore {
  getAccount({ username }) {}
  createAccount({ username, location }) {}
  getLocations({ username }) {}
  addLocation({ username, location }) {}
}
