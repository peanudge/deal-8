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
    delegate(this.element, "click", "#vertical-menu", (event) => {
      console.log("clicked");
    });
  }

  show(user, { author }) {
    this.element.innerHTML = this.template.getHeadaer({ user, author });
    super.show();
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
        <a class="header--right" id="vertical-menu">
          ${moreVertival}
          <div class="dropdown">
            <div class="dropdown-item">
              수정
            </div>
          </div>
        </a>
      `
          : ""
      }`;
  }
}
