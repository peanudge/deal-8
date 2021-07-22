import { getChatRoomAsync, getChatsAsync } from "@/api/chat.js";
import { getProductDetailAsync } from "@/api/product";
import { getProfileAsync } from "@/api/user";
import { navigateTo, router } from "@/router";
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
      navigateTo(history.state.previous);
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
          this.render();
        }
      })
      .then(() => {
        getChatRoomAsync(this.store.roomId).then(({ success, chatRoom }) => {
          if (success) {
            const { productId } = chatRoom;
            this.store.productId = productId;
            this.fetchData();
          } else {
            console.err("채팅방 정보를 가져오는데 실패했습니다.");
            navigateTo("/");
          }
        });
      });
  }

  fetchData() {
    const { productId, roomId } = this.store;
    const productRequest = getProductDetailAsync(productId);
    const chatsReqeust = getChatsAsync(roomId);

    Promise.all([productRequest, chatsReqeust]).then(
      ([productResult, chatsResult]) => {
        if (productResult.success) {
          this.store.product = productResult.product;
        }
        if (chatsResult.success) {
          this.store.chats = chatsResult.chats;
        }
        this.render();
      }
    );
  }

  render() {
    const { account, product, chats } = this.store;

    const username = account?.username;

    this.chatRoomHeaderView.show(username);
    this.chatRoomAlertModalView.show();
    if (product) {
      this.chatRoomMainHeaderView.show(product);
    }

    this.chatRoomMainContentView.loadMessages(chats, username);
  }
}
