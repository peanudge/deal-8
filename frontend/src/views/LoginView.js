import AbstractView from "./AbstractView";

export default class LoginView extends AbstractView {
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
