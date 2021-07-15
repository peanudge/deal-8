import View from '@/page/View';
import { qs } from '@/helper/selectHelpers';
import { delegate } from '@/helper/eventHelpers';

import interestSvg from '@/public/svg/interest.svg';

const tag = '[ProductDetailFooterView]';

export default class ProductDetailFooterView extends View {
  constructor(element = qs('footer'), template = new Template()) {
    console.log(tag, 'constructor');
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {}

  show(productDetail) {
    console.log(productDetail);
    this.element.innerHTML = this.template.getFooter(productDetail);
    super.show();
  }
}

class Template {
  getFooter({ id, cost }) {
    return `
        <div class="interest-toggle-btn">
            ${interestSvg}
        </div>
        <div class="spliter">|</div>
        <p class="cost">${cost ? `${cost} 원` : '가격 미정'}</p>
        <a href="/chatList/${id}">
            <div class="move-btn">채팅 목록 보기 (2)</div>
        </a>
      `;
  }
}
