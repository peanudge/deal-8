import { exitChatRoomAsync, getChatRoomAsync } from "@/api/chat.js";
import { getProfileAsync } from "@/api/user";
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

    this.chatRoomInputContainerView.on("@message-receive", (data) => {
      const { socketId } = data.detail;
      this.chatRoomMainContentView.addMessage(data.detail, socketId);
    });
  }

  init() {
    const getChatRoom = getChatRoomAsync(this.roomId);
    const getProfile = getProfileAsync();

    Promise.all([getChatRoom, getProfile]).then((values) => {
      const [roomInfo, { isAuth, account }] = values;

      if (isAuth) {
        this.store.isAuth = isAuth;
        this.store.user = account;
        this.store.currentLocation =
          account.locations.length > 0 ? account.locations[0] : "";
      } else {
        this.store.currentLocation = "";
      }

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
    const { username } = this.store.user;

    this.chatRoomHeaderView.show();
    this.chatRoomAlertModalView.show();
    this.chatRoomMainHeaderView.show(productInfo);
    this.chatRoomMainContentView.loadMessages(messages, username);
    this.chatRoomInputContainerView.socketConnect(this.roomId);
  }
}
