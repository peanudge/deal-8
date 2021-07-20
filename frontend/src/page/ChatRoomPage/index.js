import AbstractPage from "../AbstractPage";

import "@/public/css/chat.css";

import sendSvg from "@/public/svg/send.svg";

import ChatRoomHeaderView from "./views/ChatRoomHeaderView.js";
import ChatRoomAlertModalView from "./views/ChatRoomAlertModalView.js";
import ChatRoomMainHeaderView from "./views/ChatRoomMainHeaderView.js";
import ChatRoomMainContentView from "./views/ChatRoomMainContentView.js";

import Controller from "./Controller.js";
import Store from "./Store.js";

export default class ChatRoomPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Chat Room");
    this.productId = params.productId;
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


        <div class="chat-main--input-container">
            <input class="chat-main--input-container--input" type="text" />
            <div class="chat-main--input-container--submit-btn">${sendSvg}</div>
        </div>
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
    };
    const store = new Store();
    new Controller(store, this.productId, views);
  }
}
