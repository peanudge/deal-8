import { getChatRoomAsync } from "@/api/chat.js";

export default class Controller {
  constructor({ chatRoomHeaderView, chatRoomAlertModalView }) {
    this.chatRoomHeaderView = chatRoomHeaderView;
    this.chatRoomAlertModalView = chatRoomAlertModalView;
    this.configChatRoom();
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.chatRoomAlertModalView.on("@exit-room", () => {});
  }

  render() {
    this.chatRoomHeaderView.show();
    this.chatRoomAlertModalView.show();
  }
}
