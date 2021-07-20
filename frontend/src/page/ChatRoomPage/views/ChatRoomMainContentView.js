import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";

export default class ChatRoomMainContentView extends View {
  constructor(element = qs(".chat-main--content")) {
    super(element);
  }

  makeMessage(message, thisUser) {
    const $newMessage = document.createElement("div");
    $newMessage.className = `chat-main--content--message ${
      message.writter === thisUser ? "my" : ""
    }`;
    $newMessage.innerText = message.message;
    return $newMessage;
  }

  loadMessages(messages, thisUser) {
    messages
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .forEach((message) => {
        const $newMessage = this.makeMessage(message, thisUser);
        this.element.appendChild($newMessage);
      });
  }

  addMessage(message, thisUser) {
    console.log(message, thisUser);
    const $newMessage = this.makeMessage(message, thisUser);
    this.element.insertBefore($newMessage, this.element.firstChild);
  }
}
