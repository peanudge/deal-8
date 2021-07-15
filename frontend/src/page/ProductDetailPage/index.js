import AbstractPage from '../AbstractPage';
import Controller from './Controller';

import '@/public/css/detailPost.css';

import chevronDownSvg from '@/public/svg/chevron-down.svg';

import ProductDetailHeaderView from './views/ProductDetailHeaderView';
import ProductImageListView from './views/ProductImageListView';
import ProductDetailView from './views/ProductDetailView';

const tag = '[ProductDetailPage]';

export default class ProductDetailPage extends AbstractPage {
  constructor(params) {
    console.log(tag, 'contructor');
    super(params);
  }

  async render() {
    return `
    <header class="header"></header>
    <main>
      <div class="post-main--img-container">
      </div>
      <section id="sale-info">
        <div class="post-main--sale-status" id="sale-status"></div>
      </section>
    </main>
    <footer>
      <div class="interest-toggle-btn">
        <img src="./icon/interest.svg" />
      </div>
      <div class="spliter">|</div>
      <p class="cost">169,000원</p>
      <a href="/chatList.html">
        <div class="move-btn">채팅 목록 보기 (2)</div></a
      >
    </footer>
    `;
  }

  getId() {
    return this.params.productId;
  }

  async after_render() {
    const views = {
      productId: this.getId(),
      productDetailHeaderView: new ProductDetailHeaderView(),
      productImageListView: new ProductImageListView(),
      productDetailView: new ProductDetailView(),
    };
    new Controller(views);
  }
}
