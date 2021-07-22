import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";
import exampleCooler from "@/public/image/example-cooler.svg";
import { timeForToday } from "@/util/time";

const tag = "[ChatRoomListView]";

export default class ChatRoomListView extends View {
  constructor(element = qs("#chat-list-window")) {
    super(element);
    this.template = new Template();
    this.bindEvents();
  }

  bindEvents() {
    delegate(this.element, "click", ".content--chat-item", (e) => {
      const roomId = e.target.dataset.id;
      this.handleChatItemClickEvent(roomId);
    });
  }

  handleChatItemClickEvent(roomId) {
    this.emit("@move-to-chat", { value: roomId });
  }

  show(chatRoomListItems = []) {
    if (chatRoomListItems.length > 0) {
      this.element.innerHTML = this.template.getChatRooms(chatRoomListItems);
    } else {
      this.element.innerHTML = this.template.getEmptyLabel();
    }

    super.show();
  }
}

class Template {
  getChatRooms(chatRoomListItems = []) {
    return `<div class="content">
      ${chatRoomListItems
        .map((chatRoomListItem, chatRoomListItemIndex) => {
          const result = [this._getChatRoom(chatRoomListItem)];
          if (chatRoomListItemIndex !== chatRoomListItems.length - 1) {
            result.push(`
            <div class="splitter"></div>
          `);
          }

          return result.join("");
        })
        .join("")}
    </div>`;
  }

  _getChatRoom(chatRoomListItem = {}) {
    const { roomId, username, thumbnail, content, createdAt } =
      chatRoomListItem;

    return /*html*/ `
    <article class="content--chat-item" data-id = ${roomId}>
      <div class="content--chat-item--left">
        <strong class="username">${username}</strong>
        <span class="current-message">${content}</span>
      </div>
      <div class="content--chat-item--right">
        <div class="content--chat-item--right--left">
          <div>
            <span class="current-chat-time">${timeForToday(createdAt)}</span>
          </div>
        </div>
        <div class="content--chat-item--right--right">
          <img class="product-img" src="${thumbnail}" />
        </div>
      </div>
    </article>`;
  }

  getEmptyLabel() {
    return `<div class="empty-content">
              <h1 class="empty-content--label">채팅 기록이 없습니다.</h1>
            </div>`;
  }
}
