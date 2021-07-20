export default class Account {
  constructor(username, locations = []) {
    this.username = username;
    this.locations = locations;
  }
}
