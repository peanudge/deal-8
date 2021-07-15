import View from '@/page/View';
import { qs } from '@/helper/selectHelpers';
import { delegate } from '@/helper/eventHelpers';

import chevronDownSvg from '@/public/svg/chevron-down.svg';

const tag = '[ProductDetailView]';

export default class ProductDetailFooterView extends View {
  constructor(element = qs('#sale-info'), template = new Template()) {
    console.log(tag, 'constructor');
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {}

  show(productDetail) {
    this.element.innerHTML = this.template.getFooter(productDetail);
    super.show();
  }
}

class Template {
  getFooter() {
    return `
        <div class="interest-toggle-btn">
            <img src="./icon/interest.svg" />
        </div>
        <div class="spliter">|</div>
        <p class="cost">169,000원</p>
        <a href="/chatList.html">
            <div class="move-btn">채팅 목록 보기 (2)</div>
        </a>
      `;
  }
}

<footer></footer>;
