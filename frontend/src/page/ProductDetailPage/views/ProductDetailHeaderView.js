import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";

import chevronLeftSvg from "@/public/svg/chevron-left.svg";
import moreVertival from "@/public/svg/more-vertical.svg";
import { delegate } from "@/helper/eventHelpers";

const tag = "[BasicHeaderView]";

export default class ProductDetailHeaderView extends View {
  constructor(element = qs("header.header"), template = new Template()) {
    console.log(tag, "constructor");
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#author-menu", () => {
      this.handleMenuClick();
    });
    delegate(this.element, "click", "#modify-btn", () =>
      this.emit("@modifyPost"),
    );
    delegate(this.element, "click", "#delete-btn", () =>
      this.emit("@deletePost"),
    );
  }

  show(user, { author }) {
    this.element.innerHTML = this.template.getHeadaer({ user, author });
    super.show();
  }

  handleMenuClick() {
    const $verticalBtn = qs("#author-menu .dropdown");
    const currentState = $verticalBtn.style.display;
    if (currentState === "block") {
      $verticalBtn.style.display = "none";
    } else {
      $verticalBtn.style.display = "block";
    }
  }
}

class Template {
  getHeadaer({ user, author }) {
    return /*html*/ `
        <a class="header--left" href="/">
          ${chevronLeftSvg}
        </a>
      ${
        user["username"] === author
          ? `
        <a class="header--right" id="author-menu">
          ${moreVertival}
          <div class="dropdown">
            <div class="dropdown-item" id="modify-btn">
              수정하기
            </div>
            <div class="dropdown-item red-color" id="delete-btn">
              삭제하기
            </div>
          </div>
        </a>
      `
          : ""
      }`;
  }
}
