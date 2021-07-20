import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import chevronLeftSvg from "@/public/svg/chevron-left.svg";
import logOutSvg from "@/public/svg/log-out.svg";

export default class ChatRoomHeaderView extends View {
  constructor(element = qs("#header"), template = new Template()) {
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", ".header--left", () => {
      this.handleBackClick();
    });
    delegate(this.element, "click", "#out-btn", () => {
      this.handleExitRoomClick();
    });
  }
  handleBackClick() {} // TODO: 이전 페이지로 이동하는 로직
  handleExitRoomClick() {
    const $alertModal = qs("#alert-modal");
    $alertModal.style.visibility = "visible";
  }
  show() {
    this.element.innerHTML = this.template.getContent();
  }
}

class Template {
  getContent() {
    return `
        <div class="header--left" >
            ${chevronLeftSvg}
        </div>
        <h1 class="header--center">
            <span class="header--center--title"> UserE </span>
        </h1>
        <div id="out-btn" class="header--right" href="#">
            ${logOutSvg}
        </div>
    `;
  }
}
