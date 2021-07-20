import View from "@/page/View";
import { qs } from "@/helper/selectHelpers.js";

import chevronLeftSvg from "@/public/svg/chevron-left.svg";

export default class ChatRoomListHeaderView extends View {
  constructor(element = qs(".header"), template = new Template()) {
    super(element);
    this.template = template;
  }

  show(productId) {
    this.element.innerHTML = this.template.getContent(productId);
  }
}

class Template {
  getContent(productId) {
    return `
    <a class="header--left" href="/product/${productId}">
      ${chevronLeftSvg}
    </a>
    <h1 class="header--center">
        <span class="header--center--title"> 채팅하기 </span>
    </h1>
    `;
  }
}
