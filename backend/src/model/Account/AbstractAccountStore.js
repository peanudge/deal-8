export default class AbstractAccountStore {
  getAccount({ username }) {}
  createAccount({ username, newLocation }) {}
  getLocations({ username }) {}
  addLocation(Account, newLocation) {}
  getInterests(Account) {}
}
