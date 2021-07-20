import View from "@/page/View";

import { qs, qsAll } from "@/helper/selectHelpers";

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
    delegate(this.element, "click", ".dropdown-wrapper--toggle", (e) =>
      this.toggleDropDownMenu()
    );

    // out-focus event handler
    document.addEventListener("click", (e) => {
      const toggler = qs(".dropdown-wrapper--toggle", this.element);
      if (toggler === e.target) return;

      const menuItems = qsAll(".dropdown-wrapper--menu--item", this.element);
      const match = Array.from(menuItems).some(
        (menuItem) => e.target === menuItem
      );

      if (!match) {
        const $menu = qs(".dropdown-wrapper--menu", this.element);
        if ($menu) {
          this.toggleDropDownMenu(false);
        }
      }
    });
  }

  toggleDropDownMenu(expand = null) {
    const menu = qs(".dropdown-wrapper--menu", this.element);
    expand =
      expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;
    menu.setAttribute("aria-expanded", expand);
  }

  show(user, product) {
    this.element.innerHTML = this.template.getHeadaer({ user, product });
    super.show();
  }
}

class Template {
  getHeadaer({ user, product }) {
    return /*html*/ `
        <a class="header--left" href="/" data-link>
          ${chevronLeftSvg}
        </a>
      ${user.username === product.author ? this._getSettingButton() : ""}`;
  }

  _getSettingButton() {
    return /* html */ `
      <div class="header--right" id="author-menu">
        ${this._getDropDownMenu()}
      </div>
    `;
  }

  _getDropDownMenu() {
    return /*html*/ `
        <div class="dropdown-wrapper">
            <div class="dropdown-wrapper--toggle">
                <div class="location-icon"> ${moreVertival}</div>
            </div>
            <div class="dropdown-wrapper--menu right small" aria-expanded="false">
                <div class="dropdown-wrapper--menu--item center">
                    <a href="/" data-link>수정</a>
                </div>
                <div class="dropdown-wrapper--menu--item center">
                    <a href="/" data-link>삭제</a>
                </div>
            </div>
        </div>`;
  }
}
