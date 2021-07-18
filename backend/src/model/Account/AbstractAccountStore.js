export default class AbstractAccountStore {
  getAccountByUsername({username}){}
  createAccount({ username, location }) {}
  getLocations({ username }) {}
  addLocation({username,location}) {}
}
