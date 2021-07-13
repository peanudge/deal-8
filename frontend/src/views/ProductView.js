import AbstractView from "./AbstractView";

export default class ProductView extends AbstractView {
  constructor(params) {
    super(params);
    this.productId = params.id;
    this.setTitle("Login");
  }

  async render() {
    return `
        <h1>Product ${this.productId} Page!</h1>
    `;
  }
  async after_render() {
    // TODO:
  }
}
