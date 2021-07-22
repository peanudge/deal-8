import View from "@/page/View";
import { qs } from "@/helper/selectHelpers.js";

import "@/public/css/common/product_list_item.css";
import { delegate } from "@/helper/eventHelpers";
import { navigateTo } from "@/router";
import { timeForToday } from "@/util/time";

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
    const roomId = event.target.dataset.roomId;
    navigateTo(`/chat/${roomId}`);
  };

  show(chatRoomListItems = []) {
    chatRoomListItems.forEach((chatRoomListItem, chatRoomListItemIndex) => {
      const $newChatArticle = document.createElement("article");
      $newChatArticle.className = `content--chat-item ${
        // chatRoomListItem.unReadCount <= 0 ? "" : "unread"
        ""
      }`;
      $newChatArticle.dataset.roomId = chatRoomListItem.roomId;
      $newChatArticle.innerHTML = this.getChatArticle(chatRoomListItem);

      this.element.appendChild($newChatArticle);
      if (chatRoomListItemIndex !== chatRoomListItems.length - 1) {
        const splitter = document.createElement("div");
        splitter.className = "splitter";
        this.element.appendChild(splitter);
      }
    });
  }

  getChatArticle(chatRoomListItem) {
    const { username, thumbnail, content, createdAt } = chatRoomListItem;

    return `
      <div class="content--chat-item--left">
        <strong class="username">${username}</strong>
        <span class="current-message">${content}</span>
      </div>
      <div class="content--chat-item--right">
        <div class="content--chat-item--right--left">
          <div><span class="current-chat-time">${timeForToday(
            createdAt
          )}</span></div>
          <div> </div>
        </div>
        <a class="content--chat-item--right--right">
          <img src="${thumbnail}" alt="상품 썸네일 사진" />
        </a>
      </div>
    `;
  }
}
