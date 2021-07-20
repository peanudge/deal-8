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
    delegate(this.element, "click", "#get-chatRoom", (e) => {
      this.handleClickGetChatRoom(e);
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
  handleClickGetChatRoom(event) {
    this.emit("@make-chat-room");
  }
  show(user, productDetail) {
    this.element.innerHTML = this.template.getFooter(user, productDetail);
    super.show();
  }
}

class Template {
  getFooter(user, { id, cost, isInterested, author }) {
    return `
        <button id="interest-btn" class="interest-btn ${
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
                <div>
                    <div class="move-btn" id="get-chatRoom">문의하기</div> 
                <div>`
        }
            
      `;
  }
}
