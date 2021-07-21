import { getChatRoomsByProductAsync } from "@/api/chat";

export default class Controller {
  constructor(store, { chatRoomListHeaderView, chatRoomListContentView }) {
    this.chatRoomListHeaderView = chatRoomListHeaderView;
    this.chatRoomListContentView = chatRoomListContentView;
    this.store = store;
    this.init();
  }

  init() {
    getChatRoomsByProductAsync(this.store.productId).then(
      ({ result, chatRoomListItems }) => {
        this.store.chatRoomListItems = chatRoomListItems;
        this.render();
      }
    );
  }

  render() {
    const { chatRoomListItems, productId } = this.store;
    this.chatRoomListHeaderView.show(productId);
    this.chatRoomListContentView.show(chatRoomListItems);
  }
}
