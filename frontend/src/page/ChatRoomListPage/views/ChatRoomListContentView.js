import View from "@/page/View";
import { qs } from "@/helper/selectHelpers.js";

import "@/public/css/common/product_list_item.css";
import { delegate } from "@/helper/eventHelpers";
import { navigateTo } from "@/router";

export default class ChatRoomListContentView extends View {
  constructor(element = qs(".content")) {
    super(element);
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", ".content--chat-item", (event) => {
      this.handleChatRoomClick(event);
    });
  }

  handleChatRoomClick = (event) => {
    const roomKey = event.target.dataset.roomKey;
    navigateTo(`/chat/${roomKey}`);
  };

  show(roomInfos) {
    roomInfos.forEach((roomInfo) => {
      const $newChatArticle = document.createElement("article");
      $newChatArticle.className = `content--chat-item ${
        roomInfo.unReadCount <= 0 ? "" : "unread"
      }`;
      $newChatArticle.dataset.roomKey = roomInfo.key;
      this.element.appendChild($newChatArticle);
      $newChatArticle.innerHTML = this.getChatArticle(roomInfo);
    });
  }

  getChatArticle(roomInfo) {
    const { targetUser, productThumbnail, unReadCount, lastChat } = roomInfo;

    return `
      <div class="content--chat-item--left">
        <strong class="username">${targetUser}</strong>
        <span class="current-message">${lastChat.message}</span>
      </div>
      <div class="content--chat-item--right">
        <div class="content--chat-item--right--left">
          <!-- TODO: 시간차이 구하는 함수 구현 및 적용 -->
          <div><span class="current-chat-time">${"15분전"}</span></div>
          <div>
            ${
              unReadCount <= 0
                ? ""
                : `
                  <div class="un-read-count">${unReadCount}</div>
                `
            }
          </div>
        </div>
        <a class="content--chat-item--right--right">
          <img src="${productThumbnail}" alt="상품 썸네일 사진" />
        </a>
      </div>
    `;
  }
}
