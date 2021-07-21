import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";
import exampleCooler from "@/public/image/example-cooler.svg";

const tag = "[ChatRoomListView]";

export default class ChatRoomListView extends View {
  constructor(element = qs("#chat-list-window")) {
    super(element);
    this.template = new Template();
    this.bindEvents();
  }

  bindEvents() {}

  show(rooms = []) {
    if (rooms.length > 0) {
      this.element.innerHTML = this.template.getChatRooms(rooms);
    } else {
      this.element.innerHTML = this.template.getEmptyLabel();
    }

    super.show();
  }
}

class Template {
  getChatRooms(rooms = []) {
    return `<div class="content">
      ${rooms.map((room) => this._getChatRoom(room)).join("")}
    </div>`;
  }

  _getChatRoom(room = {}) {
    const {
      key,
      targetUser,
      product,
      productThumbnail,
      lastChat: { id, message, writer, createAt },
    } = room;

    return /*html*/ `<article class="content--chat-item">
      <div class="content--chat-item--left">
        <strong class="username">${targetUser}</strong>
        <span class="current-message">${message}</span>
      </div>
      <div class="content--chat-item--right">
        <div class="content--chat-item--right--left">
          <div>
            <span class="current-chat-time">15분전</span>
          </div>
          <div>
            <div class="un-read-count">0</div>
          </div>
        </div>
        <div class="content--chat-item--right--right">
          <img class="product-img" src="${productThumbnail}" />
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
