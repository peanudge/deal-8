import View from "@/page/View";
import { qs, qsAll } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import chevronDownSvg from "@/public/svg/chevron-down.svg";

const tag = "[ProductDetailView]";

export const STATUS_TYPE = {
  SALE: "SALE",
  SOLD: "SOLD",
  RESERVE: "RESERVE",
};

const STATUS_TEXT = {
  [STATUS_TYPE.SALE]: "판매 중",
  [STATUS_TYPE.SOLD]: "판매 완료",
  [STATUS_TYPE.RESERVE]: "예약 중",
};

export default class ProductDetailView extends View {
  constructor(element = qs("#sale-info"), template = new Template()) {
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

  show(user, productDetail) {
    this.element.innerHTML = this.template.getDetail(user, productDetail);
  }
}

class Template {
  getDetail(user, productDetail) {
    const {
      status,
      title,
      category,
      content,
      countOfChat,
      countOfInterest,
      countOfView,
      author,
      location,
    } = productDetail;
    return `
      ${user.username === author ? this.getStatusSelector(status) : ""}
      
      <div class="post-main--title">${title}</div>
      <div class="post-main--sub-title">
          <p>${category.name}</p>
          <p>3분 전</p> 
      </div>
      <div class="post-main--content">
        ${content}
      </div>
      <div class="post-main--info">
        <p>채팅 <span>${countOfChat}</span></p>
        <p>관심 <span>${countOfInterest}</span></p>
        <p>조회 <span>${countOfView}</span></p>
      </div>
      <div class="post-main--seller-info">
        <p class="post-main--seller-info--label">판매자 정보</p>
        <p class="post-main--seller-info--username">${author}</p>
        <p class="post-main--seller-info--address">${location}</p>
      </div>
    `;
  }

  getStatusSelector(status = STATUS_TYPE.SOLD) {
    const statusList = Object.values(STATUS_TYPE);

    return `
        <div  id="sale-status">
            ${this._getSaleStatusDropDown(statusList)}
        </div>
      `;
  }

  _getSaleStatusDropDown(statusList = []) {
    return /*html*/ `
        <div class="post-main--sale-status" class="dropdown-wrapper">
            <div class="dropdown-wrapper--toggle post-main--sale-status--content">
                <p>판매 중</p>
                <div class="location-icon"> ${chevronDownSvg}</div>
            </div>
            <div class="dropdown-wrapper--menu small" aria-expanded="false">
                ${statusList
                  .map((status) => this._getSaleStatusItem(status))
                  .join("")}
            </div>
        </div>`;
  }

  _getSaleStatusItem(status) {
    return /* html */ `<div class="dropdown-wrapper--menu--item center post-main--sale-status--menu-item" data-status="${status}">${STATUS_TEXT[status]}</div>`;
  }
}
