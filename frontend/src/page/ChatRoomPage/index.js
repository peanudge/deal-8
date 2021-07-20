import AbstractPage from "../AbstractPage";

import "@/public/css/chat.css";
import sendSvg from "@/public/svg/send.svg";

import ChatRoomHeaderView from "./views/ChatRoomHeaderView.js";
import ChatRoomAlertModalView from "./views/ChatRoomAlertModalView.js";
import ChatRoomMainHeaderView from "./views/ChatRoomMainHeaderView.js";
import ChatRoomMainContentView from "./views/ChatRoomMainContentView.js";
import ChatRoomInputContainerView from "./views/ChatRoomInputContainerView.js";

import Controller from "./Controller.js";
import Store from "./Store.js";

export default class ChatRoomPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Chat Room");
    this.roomId = params.roomId;
  }

  async render() {
    return /* html */ `
    <header class="header" id="header">
        
    </header>

    <main class="chat-main">
        <div class="chat-main--header">
            
        </div>
    

        <div class="chat-main--content">
        </div>


        <form class="chat-main--input-container">
          <input class="chat-main--input-container--input" type="text" />
          <button type="submit" id="chat-btn" class="chat-main--input-container--submit-btn"> ${sendSvg} </button>
        </form>
    </main>
    <!-- Modal -->
    <div id="alert-modal" class="alert-modal">
    </div>
      `;
  }

  async after_render() {
    const views = {
      chatRoomHeaderView: new ChatRoomHeaderView(),
      chatRoomAlertModalView: new ChatRoomAlertModalView(),
      chatRoomMainHeaderView: new ChatRoomMainHeaderView(),
      chatRoomMainContentView: new ChatRoomMainContentView(),
      chatRoomInputContainerView: new ChatRoomInputContainerView(),
    };
    const store = new Store();
    new Controller(store, this.roomId, views);
  }
}
