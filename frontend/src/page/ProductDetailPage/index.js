import AbstractPage from "../AbstractPage";
import Controller from "./Controller";

import "@/public/css/detailPost.css";
import "@/public/css/common/drop_down.css";

import Store from "./Store";

import ProductDetailHeaderView from "./views/ProductDetailHeaderView";
import ProductImageListView from "./views/ProductImageListView";
import ProductDetailView from "./views/ProductDetailView";
import ProductDetailFooterView from "./views/ProductDetailFooterView";
import ProductDetailModalView from "./views/ProductDetailModalView";

export default class ProductDetailPage extends AbstractPage {
  constructor(params) {
    super(params);
  }

  async render() {
    return /*html*/ `
    <header class="header"></header>
    <main class="post-main">
      <div class="post-main--img-container">
      </div>
      <section id="sale-info">
      </section>
    </main>
    <footer>
    </footer>
    <div id="modal-blur-bg" class="blur-bg"></div>

    <div id="post-delete-modal" class="modal">
        <p>정말 <span id="post-name"></span> 해당 상품를 삭제하시겠습니까?</p>
        <div class="modal--btn-container">
            <div id="cancel-btn" class="modal--btn-container--cancel-btn">
            취소
            </div>
            <div id="accept-btn" class="modal--btn-container--accept-btn">
            삭제
            </div>
        </div>
    </div>
    `;
  }

  async after_render() {
    const store = new Store({ productId: this.params.productId });
    const views = {
      productDetailHeaderView: new ProductDetailHeaderView(),
      productImageListView: new ProductImageListView(),
      productDetailView: new ProductDetailView(),
      productDetailFooterView: new ProductDetailFooterView(),
      productDetailModalView: new ProductDetailModalView(),
    };
    new Controller(store, views);
  }
}
