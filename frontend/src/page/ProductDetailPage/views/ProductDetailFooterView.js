import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import interestSvg from "@/public/svg/interest.svg";

const tag = "[ProductDetailFooterView]";

export default class ProductDetailFooterView extends View {
  constructor(element = qs("footer"), template = new Template()) {
    console.log(tag, "constructor");
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#interest-btn", (e) => {
      this.handleClickInterestEvent(e);
    });
  }

  handleClickInterestEvent(event) {
    const target = event.target;
    const id = target.dataset.id;
    const currentInterestStatus = Array.from(target.classList).includes("on");
    this.emit("@interest", {
      value: { id, isInterested: !currentInterestStatus },
    });
  }

  show(user, productDetail) {
    this.element.innerHTML = this.template.getFooter(user, productDetail);
    super.show();
  }
}

class Template {
  getFooter(user, { id, cost, isInterested, author }) {
    return `
        <button id="interest-btn" class="content--product--info--top--interest ${
          isInterested ? "on" : "off"
        }" data-id=${id}>
        ${interestSvg}
        </button>
        <div class="spliter">|</div>
        <p class="cost">${cost ? `${cost} 원` : "가격 미정"}</p>
        ${
          user?.username === author
            ? `
                <a href="/chatList/${id}" data-link>
                    <div class="move-btn">채팅 목록 보기 (2)</div>
                </a>`
            : `
                <a href="/chat/${id}" data-link>
                    <div class="move-btn">문의하기</div>
                </a>`
        }
            
      `;
  }
}
