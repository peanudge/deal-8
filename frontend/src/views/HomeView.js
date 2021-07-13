import AbstractView from "./AbstractView";

export default class HomeView extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async render() {
    return `
        <h1 id="title">Welcome Home!</h1>
        <a href="/login" data-link>Login</a>
        <a href="/product/1/" data-link>Product</a>
    `;
  }

  async after_render() {
    // TODO: Add
  }
}
