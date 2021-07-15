import AbstractPage from '../AbstractPage';
import Controller from './Controller';

import '@/public/css/detailPost.css';

import chevronDownSvg from '@/public/svg/chevron-down.svg';

import ProductDetailHeaderView from './views/ProductDetailHeaderView';
import ProductImageListView from './views/ProductImageListView';

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
      <section>
        <div class="post-main--sale-status">
          <p>판매 중</p>
          ${chevronDownSvg}
          <div class="post-main--sale-status--dropdown">
            <div class="dropdown-item selected">판매 중</div>
            <div class="dropdown-item">판매 완료</div>
            <div class="dropdown-item">예약 중</div>
          </div>
        </div>

        <div class="post-main--title">빈티지 롤러 스케이트</div>
        <div class="post-main--sub-title">
          <p>기타 중고물품</p>
          <p>3분 전</p>
        </div>
        <div class="post-main--content">
          어린시절 추억의 향수를 불러 일으키는 롤러 스케이트입니다. 빈티지
          특성상 사용감 있지만 전체적으로 깨끗한 상태입니다. 촬영용 소품이나,
          거실에 장식용으로 추천해 드립니다. 단품 입고 되었습니다. 새 제품으로
          보존된 제품으로 전용박스까지 보내드립니다. 사이즈는 235 입니다.
        </div>
        <div class="post-main--info">
          <p>채팅 <span>0</span></p>
          <p>관심 <span>0</span></p>
          <p>조회 <span>0</span></p>
        </div>

        <div class="post-main--seller-info">
          <p class="post-main--seller-info--label">판매자 정보</p>
          <p class="post-main--seller-info--username">Username</p>
          <p class="post-main--seller-info--address">역삼동</p>
        </div>
      </section>
    </main>
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
    };
    new Controller(views);
  }
}
