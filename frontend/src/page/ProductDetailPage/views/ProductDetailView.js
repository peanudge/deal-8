import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import chevronDownSvg from "@/public/svg/chevron-down.svg";

const tag = "[ProductDetailView]";

export default class ProductDetailView extends View {
  constructor(element = qs("#sale-info"), template = new Template()) {
    console.log(tag, "constructor");
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#sale-status", () => {
      this.handleStatusClick();
    });
  }

  show(user, productDetail) {
    this.element.innerHTML = this.template.getDetail(user, productDetail);
    super.show();
  }

  handleStatusClick() {
    const locationMenu = qs(".post-main--sale-status--dropdown");
    const currentState = locationMenu.style.display;
    if (currentState === "block") {
      locationMenu.style.display = "none";
    } else {
      locationMenu.style.display = "block";
    }
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
          <p>3분 전</p> <!-- TODO: 상대적 시간 시간 계산 후 배치 -->
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

  getStatusSelector(status) {
    const textMapping = {
      SALE: "판매 중",
      SOLD: "판매 완료",
      RESERVE: "예약 중",
    };
    const statusTypes = Object.keys(textMapping);
    let flag = false;

    const getDropDownItem = (statusType, isSelected) => {
      return `<div class="dropdown-item ${
        isSelected ? " selected" : ""
      }" data-type=${statusType}>${textMapping[statusType]}</div>`;
    };

    const dropDownList = statusTypes.map((statusType) => {
      if (flag) {
        return getDropDownItem(statusType);
      }
      if (status === statusType) {
        flag = true;
        return getDropDownItem(statusType, true);
      } else {
        return getDropDownItem(statusType);
      }
    });

    return `
        <div class="post-main--sale-status" id="sale-status">
            <p>판매 중</p>
            ${chevronDownSvg}
            <div class="dropdown">
                ${dropDownList.join("")}
            </div>
        </div>
      `;
  }
}
