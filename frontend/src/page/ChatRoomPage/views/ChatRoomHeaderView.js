import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";

import logOutSvg from "@/public/svg/log-out.svg";
import { navigateTo } from "@/router";

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

  handleBackClick() {
    // TODO: back
    this.emit("@back");
  }

  handleExitRoomClick() {
    const $alertModal = qs("#alert-modal");
    $alertModal.style.visibility = "visible";
  }
  show(username) {
    this.element.innerHTML = this.template.getContent(username);
  }
}

class Template {
  getContent(username) {
    return /* html */ `
        <div class="header--left back-icon">
        ${chevronLeftSVG}
        </div>
        <h1 class="header--center">
            <span class="header--center--title"> ${username} </span>
        </h1>
        <div id="out-btn" class="header--right" href="#">
            ${logOutSvg}
        </div>
    `;
  }
}
