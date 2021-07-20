import { exitChatRoomAsync, getChatRoomAsync } from "@/api/chat.js";
import { navigateTo } from "@/router";

export default class Controller {
  constructor(
    store,
    roomId,
    {
      chatRoomHeaderView,
      chatRoomAlertModalView,
      chatRoomMainHeaderView,
      chatRoomMainContentView,
      chatRoomInputContainerView,
    }
  ) {
    this.chatRoomHeaderView = chatRoomHeaderView;
    this.chatRoomAlertModalView = chatRoomAlertModalView;
    this.chatRoomMainHeaderView = chatRoomMainHeaderView;
    this.chatRoomMainContentView = chatRoomMainContentView;
    this.chatRoomInputContainerView = chatRoomInputContainerView;

    this.store = store;
    this.roomId = roomId;
    this.subscribeViewEvents();

    this.init();
  }

  subscribeViewEvents() {
    this.chatRoomAlertModalView.on("@exit-room", () => {
      exitChatRoomAsync(this.roomId).then((result) => {
        if (result.success) {
          navigateTo("/");
        }
      });
    });
  }

  init() {
    getChatRoomAsync(this.roomId).then((roomInfo) => {
      this.store.roomKey = roomInfo?.key;
      this.store.targetUser = roomInfo?.targetUser;
      this.store.roomId = roomInfo?.roomId;
      this.store.productTitle = roomInfo?.productTitle;
      this.store.productThumbnail = roomInfo?.productThumbnail;
      this.store.productCost = roomInfo?.productCost;
      this.store.chatLogs = roomInfo?.chatLogs;
      this.store.totalMessageCount = roomInfo?.totalMessageCount;
      this.store.messages = roomInfo?.messages;

      this.render();
    });
  }

  render() {
    const productInfo = {
      productTitle: this.store.productTitle,
      productCost: this.store.productCost,
      productThumbnail: this.store.productThumbnail,
    };
    const messages = this.store.messages;
    const targetUser = this.store.targetUser;

    this.chatRoomHeaderView.show();
    this.chatRoomAlertModalView.show();
    this.chatRoomMainHeaderView.show(productInfo);
    this.chatRoomMainContentView.addMessages(messages, targetUser);
    this.chatRoomInputContainerView.socketConnect();
  }
}
