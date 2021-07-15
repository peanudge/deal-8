import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import exampleCooler from "@/public/image/example-cooler.svg";
import interestIcon from "@/public/svg/interest.svg";
import chatIcon from "@/public/svg/chat.svg";
import interestSmallIcon from "@/public/svg/interest-small.svg";

const tag = "[ProductList]";

export default class ProductListView extends View {
  constructor(
    element = qs("#product-list-container"),
    template = new Template()
  ) {
    console.log(tag, "constructor");
    super(element);
    this.template = template;
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
    this.element.innerHTML = this.template.getProductItems(data);
    super.show();
  }
}

class Template {
  getProductItems(products) {
    const result = products.map((product) => this.getProductItem(product));
    return result.join("");
  }
  getProductItem(product) {
    const {
      id,
      title,
      cost,
      location,
      updatedAt,
      thumbnail,
      countOfChat,
      countOfInterest,
      isInterested,
    } = product;

    return `
    <article class="content--product" data-id=${id}>
        <div class="content--product--thumbnail">
          ${exampleCooler}
          <!-- TODO img 태그로 교체 후 thumbnail 적용 -->
        </div>
        <div class="content--product--info">
          <div class="content--product--info--top">
            <div>
              <h1>${title}</h1>
              <button id="interest-btn" class="content--product--info--top--interest ${
                isInterested ? "on" : "off"
              }" data-id=${id}>
                ${interestIcon}
              </button>
            </div>
            <div>
              <span class="location">${location}</span>
              <span class="time">
              <!-- TODO helper의 메서드 이용-->
              2시간 전
                
                </span>
            </div>
            <div>
              <strong> ${cost} 원 </strong>
            </div>
          </div>
          <div class="content--product--info--bottom">
            ${
              countOfChat &&
              `
                <div>
                    <div class="chat-icon">${chatIcon}</div>
                    <span>${countOfChat}</span>
                </div>
                `
            }
            ${
              countOfInterest &&
              `
                <div>
                    <div class="interest-small-icon">${interestSmallIcon}</div>
                    <span>${countOfInterest}</span>
                </div>
                `
            }
            
          </div>
        </div>
    </article>
    `;
  }
}
