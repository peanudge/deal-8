import { getChatRoomsByProductAsync } from "@/api/chat";

export default class Controller {
  constructor(
    store,
    productId,
    { chatRoomListHeaderView, chatRoomListContentView }
  ) {
    this.chatRoomListHeaderView = chatRoomListHeaderView;
    this.chatRoomListContentView = chatRoomListContentView;
    this.store = store;
    this.productId = productId;
    this.init();
  }

  init() {
    getChatRoomsByProductAsync(this.productId).then((roomInfos) => {
      this.store.roomInfos = roomInfos;
      this.render();
    });
  }

  render() {
    const { roomInfos } = this.store;
    this.chatRoomListHeaderView.show(this.productId);
    this.chatRoomListContentView.show(roomInfos);
  }
}
