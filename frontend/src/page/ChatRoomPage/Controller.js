import { getChatRoomAsync } from "@/api/chat.js";

export default class Controller {
  constructor(store, { chatRoomHeaderView, chatRoomAlertModalView }) {
    this.chatRoomHeaderView = chatRoomHeaderView;
    this.chatRoomAlertModalView = chatRoomAlertModalView;
    this.store = store;
    this.configChatRoom();
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.chatRoomAlertModalView.on("@exit-room", () => {});
  }

  configChatRoom() {
    getChatRoomAsync().then((roomInfo) => {
      this.store.roomKey = roomInfo?.key;
      this.store.targetUser = roomInfo?.targetUser;
      this.store.product = roomInfo?.product;
      this.store.productThumbnail = roomInfo?.productThumbnail;
    });
  }

  render() {
    this.chatRoomHeaderView.show();
    this.chatRoomAlertModalView.show();
  }
}
