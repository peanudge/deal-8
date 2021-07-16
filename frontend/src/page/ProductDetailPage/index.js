import AbstractPage from "../AbstractPage";
import Controller from "./Controller";

import "@/public/css/detailPost.css";

import Store from "./Store";

import ProductDetailHeaderView from "./views/ProductDetailHeaderView";
import ProductImageListView from "./views/ProductImageListView";
import ProductDetailView from "./views/ProductDetailView";
import ProductDetailFooterView from "./views/ProductDetailFooterView";

const tag = "[ProductDetailPage]";

export default class ProductDetailPage extends AbstractPage {
  constructor(params) {
    console.log(tag, "contructor");
    super(params);
  }

  async render() {
    return /*html*/ `
    <header class="header"></header>
    <main>
      <div class="post-main--img-container">
      </div>
      <section id="sale-info">
      </section>
    </main>
    <footer>
    </footer>
    `;
  }

  getId() {
    return this.params.productId;
  }

  async after_render() {
    const store = new Store();
    const views = {
      productId: this.getId(),
      productDetailHeaderView: new ProductDetailHeaderView(),
      productImageListView: new ProductImageListView(),
      productDetailView: new ProductDetailView(),
      productDetailFooterView: new ProductDetailFooterView(),
    };
    new Controller(store, views);
  }
}
