import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

const tag = "[ChatListView]";

export default class ChatListView extends View {
  constructor(element = qs("#chat-list-window")) {
    console.log(tag, "constructor");
    super(element);
    this.bindEvents();
  }

  bindEvents() {}

  show() {
    this.element.innerHTML = `<h1>Chat 입니다.</h1>`;
    super.show();
  }
}
