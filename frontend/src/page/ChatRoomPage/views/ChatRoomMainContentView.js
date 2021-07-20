import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";

export default class ChatRoomMainContentView extends View {
  constructor(element = qs(".chat-main--content")) {
    super(element);
  }

  addMessages(messages, targetUser) {
    messages
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .forEach((message) => {
        const $newMessage = document.createElement("div");
        $newMessage.className = `chat-main--content--message ${
          message.writter !== targetUser ? "my" : ""
        }`;
        $newMessage.innerText = message.message;
        this.element.appendChild($newMessage);
      });
  }
}
