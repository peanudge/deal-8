import { getChatRoomAsync, getChatLogsAsync } from "@/api/chat.js";
import { getProductDetailAsync } from "@/api/product";
import { getProfileAsync } from "@/api/user";
import { navigateTo } from "@/router";
import { io } from "socket.io-client";

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
    this.socket = io.connect("/", {
      reconnectionDelayMax: 10000,
    });

    this.subscribeSocketEvents();
    this.subscribeViewEvents();
    this.init();
  }

  subscribeSocketEvents() {
    this.socket.on("connect", () => {
      this.socket.emit("join", this.store.roomId);
    });

    this.socket.on("server-message", (message) => {
      const { id, room, content, writer, createdAt } = message;
      this.chatRoomMainContentView.addMessage(
        {
          id,
          room,
          content,
          writer,
          createdAt,
        },
        writer === this.store.account?.username
      );
    });
  }

  subscribeViewEvents() {
    this.chatRoomAlertModalView.on("@exit-room", () => {
      // TODO: EXIT API
    });

    this.chatRoomHeaderView.on("@back", () => {
      const { id } = this.store.product;
      navigateTo("/product/" + id);
    });

    this.chatRoomInputContainerView.on("@send-message", (event) => {
      const content = event.detail.value;
      this.socket.emit("client-message", content);
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
        getChatRoomAsync(this.store.roomId).then(({ success, chatRoom }) => {
          if (success) {
            const { productId, roomId } = chatRoom;
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

    // this.chatRoomMainContentView.loadMessages(chatLogs, username);
  }
}
