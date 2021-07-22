import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";
import { timeForToday } from "@/util/time";

import exampleCooler from "@/public/image/example-cooler.svg";
import interestSVG from "@/public/svg/interest.svg";
import moreVerticalSVG from "@/public/svg/more-vertical.svg";
import chatSVG from "@/public/svg/chat.svg";
import interestSmallSVG from "@/public/svg/interest-small.svg";

const tag = "[ProductList]";

export default class ProductListView extends View {
  constructor(
    element = qs("#product-container"),
    option = {
      showInterestBtn: true,
      showSettingBtn: false,
      showChatMark: true,
      showInterestMark: true,
      emptyMessage: "상품이 존재하지 않습니다.",
    }
  ) {
    super(element);
    this.option = option;
    this.template = new Template();
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#interest-btn", (e) =>
      this.handleClickInterestEvent(e)
    );
  }

  handleClickInterestEvent(event) {
    const target = event.target;
    const id = target.dataset.id;
    const currentInterestStatus = Array.from(target.classList).includes("on");
    this.emit("@interest", {
      value: { id, isInterested: !currentInterestStatus },
    });
  }

  show(data = []) {
    if (data.length > 0) {
      this.element.innerHTML = this.template.getProductItems(data, this.option);
    } else {
      this.element.innerHTML = this.template.getEmptyLabel(
        this.option.emptyMessage
      );
    }
    super.show();
  }
}

class Template {
  getProductItems(products, option) {
    return `
      <div class="content">
        ${products
          .map((product, productIndex) => {
            const result = [this.getProductItem(product, option)];
            if (productIndex !== products.length - 1) {
              result.push(`
              <div class="splitter"></div>
            `);
            }
            return result.join("");
          })
          .join("")}
      </div> 
    `;
  }

  getProductItem(product, option = {}) {
    const {
      id,
      title,
      cost,
      location,
      createdAt,
      thumbnail,
      countOfChat,
      countOfInterest,
      isInterested,
    } = product;

    return /*html*/ `
    <article class="content--product" data-id=${id}>
          <img class="content--product--thumbnail" src="${thumbnail}" />
          <div class="content--product--info">
            <div class="content--product--info--top">
              <div>
              <a class="content--product--info--top--title" href="/product/${id}" data-link><h1>${title}</h1></a>
                ${
                  option.showInterestBtn
                    ? this._getInterestBtn(isInterested, id)
                    : ""
                }
                ${option.showSettingBtn ? this._getSettingBtn() : ""}
              </div>
              <div>
                <span class="location">${location}</span>
                <span class="time">${timeForToday(createdAt)}</span>
              </div>
              <div>
                <strong> ${cost ? cost : "-"} 원 </strong>
              </div>
            </div>
            <div class="content--product--info--bottom">
              ${
                option.showChatMark && countOfChat
                  ? this._getChatMark(countOfChat)
                  : ""
              }
              ${
                option.showInterestMark && countOfInterest >= 0
                  ? this._getInterestMark(countOfInterest)
                  : ""
              }
            </div>
          </div>
    </article>
    `;
  }

  _getChatMark(count) {
    return `
    <div>
        <div class="chat-icon">${chatSVG}</div>
        <span>${count}</span>
    </div>
    `;
  }

  _getInterestMark(count) {
    return `
    <div>
        <div class="interest-small-icon">${interestSmallSVG}</div>
        <span>${count}</span>
    </div>
    `;
  }

  _getSettingBtn() {
    return `<div id="setting-btn" class="content--product--info--top--menu">
      ${moreVerticalSVG}
    </div>`;
  }

  _getInterestBtn(isInterested, id) {
    return `<button id="interest-btn" class="content--product--info--top--interest ${
      isInterested ? "on" : "off"
    }" data-id=${id}>
      ${interestSVG}
    </button>`;
  }

  getEmptyLabel(text) {
    return `<div class="empty-content">
              <h1 class="empty-content--label">${text}</h1>
            </div>`;
  }
}
