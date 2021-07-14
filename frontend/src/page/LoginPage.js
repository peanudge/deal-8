import AbstractPage from "./AbstractPage";

export default class LoginPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async render() {
    return `
        <h1>Login Page!</h1>
    `;
  }
  async after_render() {
    // TODO:
  }
}
