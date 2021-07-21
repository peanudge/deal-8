import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";

export default class ChatRoomMainContentView extends View {
  constructor(element = qs(".chat-main--content")) {
    super(element);
  }

  makeMessage(message, currentUsername) {
    const $newMessage = document.createElement("div");
    $newMessage.className = `chat-main--content--message ${
      message.writter === currentUsername ? "my" : ""
    }`;
    $newMessage.innerText = message.message;
    return $newMessage;
  }

  loadMessages(messages, currentUsername) {
    messages
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .forEach((message) => {
        const $newMessage = this.makeMessage(message, currentUsername);
        this.element.appendChild($newMessage);
      });
  }

  addMessage(message, currentUsername) {
    const $newMessage = this.makeMessage(message, currentUsername);
    this.element.insertBefore($newMessage, this.element.firstChild);
  }
}
