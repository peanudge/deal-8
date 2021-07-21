import {
  exitChatRoomAsync,
  getChatRoomAsync,
  getChatLogsAsync,
} from "@/api/chat.js";
import { getProductDetailAsync } from "@/api/product";
import { getProfileAsync } from "@/api/user";
import { navigateTo } from "@/router";

export default class Controller {
  constructor(
    store,
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

    this.chatRoomHeaderView.on("@back", () => {
      const { id } = this.store.product;
      navigateTo("/product/" + id);
    });
  }

  init() {
    getProfileAsync()
      .then(({ isAuth, account }) => {
        if (!isAuth) {
          navigateTo("/login");
        } else {
          this.store.account = account;
        }
      })
      .then(() => {
        getChatRoomAsync(this.store.roomId).then(({ success, room }) => {
          if (success) {
            const { productId, roomId } = room;
            this.fetchProductData(productId);
            this.fetchChatLogData(roomId);
          } else {
            console.err("채팅방 정보를 가져오는데 실패했습니다.");
            navigateTo("/");
          }
        });
      });
  }
  fetchChatLogData(roomdId) {
    // TODO: 채팅방안에서 있는 chat log 가져오기
    getChatLogsAsync(roomdId).then(({ success, chats }) => {
      if (success) {
        this.store.chatLogs = chats;
        this.render();
      } else {
        console.err("채팅 정보를 불러오는데 실패했습니다.");
      }
    });
  }
  fetchProductData(productId) {
    getProductDetailAsync(productId).then(({ success, product }) => {
      if (success) {
        this.store.product = product;
        this.render();
      } else {
        console.err("상품정보를 불러오는데 실패했습니다.");
      }
    });
  }

  render() {
    const { account, product, chatLogs } = this.store;

    const username = account?.username;

    this.chatRoomHeaderView.show(username);
    this.chatRoomAlertModalView.show();
    this.chatRoomMainHeaderView.show(product);
    this.chatRoomMainContentView.loadMessages(chatLogs, username);
    this.chatRoomInputContainerView.socketConnect(this.roomId);
  }
}
