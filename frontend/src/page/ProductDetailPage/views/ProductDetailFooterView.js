import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import interestSvg from "@/public/svg/interest.svg";

const tag = "[ProductDetailFooterView]";

export default class ProductDetailFooterView extends View {
  constructor(element = qs("footer"), template = new Template()) {
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#interest-btn", (e) => {
      this.handleClickInterestEvent(e);
    });
    delegate(this.element, "click", "#attend-chat-btn", (e) => {
      this.handleClickGetChatRoom(e);
    });

    delegate(this.element, "click", "#move-to-chat-list-btn", (e) => {
      this.handleClickChatListButton(e);
    });
  }
  handleClickChatListButton() {
    this.emit("@move-to-chatlist");
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
    this.emit("@attend-chat-room");
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
                <div>
                    <div id="move-to-chat-list-btn" class="move-btn">채팅 목록 보기</div> 
                </div>`
            : `
                <div>
                    <div class="move-btn" id="attend-chat-btn">문의하기</div> 
                <div>`
        }
            
      `;
  }
}
