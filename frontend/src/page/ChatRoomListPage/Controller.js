import { getChatRoomsByProductAsync } from "@/api/chat";
import { navigateTo } from "@/router";

export default class Controller {
  constructor(store, { chatRoomListHeaderView, chatRoomListContentView }) {
    this.chatRoomListHeaderView = chatRoomListHeaderView;
    this.chatRoomListContentView = chatRoomListContentView;
    this.store = store;
    this.subscribeViewEvents();
    this.init();
  }

  init() {
    getChatRoomsByProductAsync(this.store.productId).then(
      ({ success, chatRoomListItems }) => {
        if (success) {
          this.store.chatRoomListItems = chatRoomListItems;
        }
        this.render();
      }
    );
  }

  subscribeViewEvents() {
    this.chatRoomListContentView.on("@move-to-chat", (e) => {
      const roomId = e.detail.value;
      navigateTo("/chat/" + roomId, {
        previous: "/chatList/" + this.store.productId,
      });
    });

    this.chatRoomListHeaderView.on("@back", () => {
      navigateTo("/product/" + this.store.productId);
    });
  }

  render() {
    const { chatRoomListItems, productId } = this.store;
    this.chatRoomListHeaderView.show(productId);
    this.chatRoomListContentView.show(chatRoomListItems);
  }
}
