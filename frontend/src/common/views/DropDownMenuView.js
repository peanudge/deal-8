import { qs, qsAll } from "@/helper/selectHelpers";

import gpsSVG from "@/public/svg/gps-white.svg";

import View from "@/page/View";
import { delegate } from "@/helper/eventHelpers";

const tag = "[DropDownMenuView]";

export default class DropDownMenuView extends View {
  constructor(element = qs("#location-dropdown")) {
    console.log(tag, "constructor");
    super(element);
    this.template = new Template();
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", ".dropdown-wrapper--toggle", (e) =>
      this.toggleDropDownMenu()
    );

    // Detecting Out-Focus Event Handler
    document.addEventListener("click", (e) => {
      const toggler = qs(".dropdown-wrapper--toggle", this.element);
      if (toggler === e.target) return;

      const menuItems = qsAll(".dropdown-wrapper--menu--item", this.element);
      const match = Array.from(menuItems).some(
        (menuItem) => e.target === menuItem
      );

      if (!match) {
        this.toggleDropDownMenu(false);
      }
    });

    delegate(this.element, "click", ".dropdown-wrapper--menu--item", (e) => {
      const { item } = e.target.dataset;
      this.emit("@change-item", { value: item });
    });
  }

  toggleDropDownMenu(expand = null) {
    const menu = qs(".dropdown-wrapper--menu", this.element);
    expand =
      expand === null ? menu.getAttribute("aria-expanded") !== "true" : expand;
    menu.setAttribute("aria-expanded", expand);
  }

  show(currentItem = "", items = []) {
    this.element.innerHTML = /* html */ `
            <div class="dropdown-wrapper">
                <div class="dropdown-wrapper--toggle">
                    <div class="location-icon">${gpsSVG}</div>
                    <strong> ${currentItem} </strong>
                </div>
                <div class="dropdown-wrapper--menu" aria-expanded="false">
                    ${this.template.getItems(items)}
                    <div class="dropdown-wrapper--menu--item">
                        <a href="/location" data-link>내 동내 설정하기</a>
                    </div>
                </div>
            </div>`;
    super.show();
  }
}

class Template {
  getDropDownToggle;

  getItems(items) {
    return items
      .map(
        (item) =>
          `<div class="dropdown-wrapper--menu--item" data-item="${item}">${item}</div>`
      )
      .join("");
  }
}
