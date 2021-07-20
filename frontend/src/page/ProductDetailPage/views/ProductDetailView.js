import View from "@/page/View";
import { qs, qsAll } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import chevronDownSvg from "@/public/svg/chevron-down.svg";
import {
  ProductStatusList,
  ProductStatusMap,
  PRODUCT_STATUS_SAIL,
} from "@/util/productStatus";
import { timeForToday } from "@/util/time";

export default class ProductDetailView extends View {
  constructor(element = qs("#sale-info"), template = new Template()) {
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
      } else {
        const status = e.target.dataset.status;
        this.emit("@change-status", { value: status });
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
    super.show();
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
      createdAt,
      author,
      location,
    } = productDetail;
    return `
      ${user?.username === author ? this._getStatusSelector(status) : ""}
      
      <div class="post-main--title">${title}</div>
      <div class="post-main--sub-title">
          <p class="category-name-label">${category}</p>
          <p class="create-time-label">${timeForToday(createdAt)}</p> 
      </div>
      <div class="post-main--content">
        ${content}
      </div>
      <div class="post-main--info">
        <p class="post-main--info--chat-count">채팅 <span>${countOfChat}</span></p>
        <p class="post-main--info--interest-count">관심 <span>${countOfInterest}</span></p>
        <p class="post-main--info--view-count">조회 <span>${countOfView}</span></p>
      </div>
      <div class="post-main--seller-info">
        <p class="post-main--seller-info--label">판매자 정보</p>
        <p class="post-main--seller-info--username">${author}</p>
        <p class="post-main--seller-info--address">${location}</p>
      </div>
    `;
  }

  _getStatusSelector(status = PRODUCT_STATUS_SAIL) {
    return `
        <div id="sale-status">
            ${this._getSaleStatusDropDown(status)}
        </div>
      `;
  }

  _getSaleStatusDropDown(currentStatus) {
    return /*html*/ `
        <div class="post-main--sale-status" class="dropdown-wrapper">
            <div class="dropdown-wrapper--toggle post-main--sale-status--content">
                <p>${ProductStatusMap[currentStatus]}</p>
                <div class="location-icon"> ${chevronDownSvg}</div>
            </div>
            <div class="dropdown-wrapper--menu small" aria-expanded="false">
                ${ProductStatusList.map((status) =>
                  this._getSaleStatusItem(status)
                ).join("")}
            </div>
        </div>`;
  }

  _getSaleStatusItem(status) {
    return /* html */ `
    <div class="dropdown-wrapper--menu--item center post-main--sale-status--menu-item" 
                              data-status="${status}">${ProductStatusMap[status]}</div>`;
  }
}
