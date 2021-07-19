import { getChatRoomAsync } from "@/api/chat.js";

export default class Controller {
  constructor(
    store,
    productId,
    { chatRoomHeaderView, chatRoomAlertModalView, chatRoomMainHeaderView }
  ) {
    this.chatRoomHeaderView = chatRoomHeaderView;
    this.chatRoomAlertModalView = chatRoomAlertModalView;
    this.chatRoomMainHeaderView = chatRoomMainHeaderView;

    this.store = store;
    this.productId = productId;
    this.subscribeViewEvents();

    this.init();
  }

  subscribeViewEvents() {
    this.chatRoomAlertModalView.on("@exit-room", () => {});
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

      this.render();
    });
  }

  render() {
    const productInfo = {
      productTitle: this.store.productTitle,
      productCost: this.store.productCost,
      productThumbnail: this.store.productThumbnail,
    };
    console.log(productInfo);

    this.chatRoomHeaderView.show();
    this.chatRoomAlertModalView.show();
    this.chatRoomMainHeaderView.show(productInfo);
  }
}
