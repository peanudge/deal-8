import View from "@/page/View";
import { qs } from "@/helper/selectHelpers.js";

import chevronLeftSvg from "@/public/svg/chevron-left.svg";
import { delegate } from "@/helper/eventHelpers";

export default class ChatRoomListHeaderView extends View {
  constructor(element = qs(".header"), template = new Template()) {
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#back-btn", () => {
      this.emit("@back");
    });
  }

  show() {
    this.element.innerHTML = this.template.getContent();
  }
}

class Template {
  getContent() {
    return `
    <div id="back-btn" class="header--left">
      ${chevronLeftSvg}
    </div>
    <h1 class="header--center">
        <span class="header--center--title"> 채팅하기 </span>
    </h1>
    `;
  }
}
