import { exitChatRoomAsync, getChatRoomAsync } from "@/api/chat.js";
import { navigateTo } from "@/router";

export default class Controller {
  constructor(
    store,
    productId,
    {
      chatRoomHeaderView,
      chatRoomAlertModalView,
      chatRoomMainHeaderView,
      chatRoomMainContentView,
    }
  ) {
    this.chatRoomHeaderView = chatRoomHeaderView;
    this.chatRoomAlertModalView = chatRoomAlertModalView;
    this.chatRoomMainHeaderView = chatRoomMainHeaderView;
    this.chatRoomMainContentView = chatRoomMainContentView;

    this.store = store;
    this.productId = productId;
    this.subscribeViewEvents();

    this.init();
  }

  subscribeViewEvents() {
    this.chatRoomAlertModalView.on("@exit-room", () => {
      exitChatRoomAsync(this.productId).then((result) => {
        if (result.success) {
          navigateTo("/");
        }
      });
    });
  }

  init() {
    getChatRoomAsync(this.productId).then((roomInfo) => {
      this.store.roomKey = roomInfo?.key;
      this.store.targetUser = roomInfo?.targetUser;
      this.store.productId = roomInfo?.productId;
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

    console.log(productInfo);

    this.chatRoomHeaderView.show();
    this.chatRoomAlertModalView.show();
    this.chatRoomMainHeaderView.show(productInfo);
    this.chatRoomMainContentView.addMessages(messages, targetUser);
  }
}
