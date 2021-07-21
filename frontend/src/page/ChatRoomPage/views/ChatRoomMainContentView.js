import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";

export default class ChatRoomMainContentView extends View {
  constructor(element = qs(".chat-main--content")) {
    super(element);
  }

  addMessage(message, isMine = false) {
    const $messageElement = document.createElement("div");
    $messageElement.classList.add("chat-main--content--message");
    if (isMine) {
      $messageElement.classList.add("my");
    }
    $messageElement.innerText = message.content;
    if (this.element.children.length > 0) {
      this.element.insertBefore($messageElement, this.element.firstChild);
    } else {
      this.element.appendChild($messageElement);
    }
  }

  loadMessages(chats = [], username) {
    chats.forEach((chat) => {
      const { writer } = chat;
      const isMine = username === writer;
      this.addMessage(chat, isMine);
    });
  }
  // loadMessages(messages = [], currentUsername) {
  //   messages
  //     .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  //     .forEach((message) => {
  //       const $newMessage = this.makeMessage(message, currentUsername);
  //       this.element.appendChild($newMessage);
  //     });
  // }

  // addMessage(message, currentUsername) {
  //   const $newMessage = this.makeMessage(message, currentUsername);
  //   this.element.insertBefore($newMessage, this.element.firstChild);
  // }
}
