import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";

import { on } from "@/helper/eventHelpers";

export default class ChatRoomInputContainerView extends View {
  constructor(element = qs(".chat-main--input-container")) {
    super(element);
    this.bindingEvents();
    this.chatInput = qs(".chat-main--input-container--input", this.element);
  }

  bindingEvents() {
    on(qs("#chat-btn", this.element), "click", (e) => {
      e.preventDefault();
      this.handleSubmitChatting();
    });
  }

  handleSubmitChatting() {
    const message = this.chatInput.value; // 채팅 메시지
    if (message !== "") {
      this.chatInput.value = ""; // 채팅 초기화
      this.emit("@send-message", { value: message });
    }
  }
}
