import View from '@/page/View';

import { qs } from '@/helper/selectHelpers';

import chevronLeftSvg from '@/public/svg/chevron-left.svg';
import moreVertival from '@/public/svg/more-vertical.svg';

const tag = '[BasicHeaderView]';

export default class ProductDetailHeaderView extends View {
  constructor(element = qs('header.header'), template = new Template()) {
    console.log(tag, 'constructor');
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {}

  show() {
    this.element.innerHTML = this.template.getHeadaer();
    super.show();
  }
}

class Template {
  getHeadaer() {
    return `
      <a class="header--left" href="/">
        ${chevronLeftSvg}
      </a>
      <a class="header--right" href="#">
        ${moreVertival}
      </a>
      `;
  }
}
