import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";

import { io } from "socket.io-client";
import { on } from "@/helper/eventHelpers";

export default class ChatRoomInputContainerView extends View {
  constructor(element = qs(".chat-main--input-container")) {
    super(element);
    this.bindingEvents();
    this.chatInput = qs(".chat-main--input-container--input", this.element);
    this.socket = io.connect("http://localhost:3000", {
      reconnectionDelayMax: 10000,
    });
  }

  bindingEvents() {
    on(qs("#chat-btn", this.element), "click", (e) => {
      e.preventDefault();
      this.handleSubmitChatting();
    });
  }
  handleSubmitChatting() {
    const message = this.chatInput.value; // 채팅 메시지
    this.chatInput.value = ""; // 채팅 초기화
    this.sendMessage(message);
  }
  socketConnect(roomId) {
    const socket = this.socket;
    socket.emit("request joinRoom", roomId);
    socket.on("message", (data) => {
      data.socketId = socket.id;
      this.emit("@message-receive", data);
    });
  }
  sendMessage(message) {
    this.socket.emit("message", message);
  }
}
