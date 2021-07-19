import AbstractPage from "../AbstractPage";

import "@/public/css/chat.css";

import sendSvg from "@/public/svg/send.svg";

import ChatRoomHeaderView from "./views/ChatRoomHeaderView.js";
import ChatRoomAlertModalView from "./views/ChatRoomAlertModalView";

import Controller from "./Controller.js";
import Store from "./Store.js";

export default class ChatRoomPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Chat Room");
  }

  async render() {
    return /* html */ `
    <header class="header" id="header">
        
    </header>

    <main class="chat-main">
        <div class="chat-main--header">
            <img class="chat-main--header--img" src="./image/example-skate.svg" />
            <div class="chat-main--header--content">
                <p>빈티지 롤러 스케이트</p>
                <p>160,000원</p>
            </div>
            <div class="chat-main--header--status">판매중</div>
        </div>
        <div class="chat-main--content">
            <div class="chat-main--content--message">
                안녕하세요! 궁금한게 있는데요
            </div>
            <div class="chat-main--content--message my">네 안녕하세요!</div>
            <div class="chat-main--content--message">혹시</div>
            <div class="chat-main--content--message">
                실제로 신어볼 수 있는 건가요?
            </div>
            <div class="chat-main--content--message">
                실제로 신어볼 수 있는 건가요?
            </div>
            <div class="chat-main--content--message">
                실제로 신어볼 수 있는 건가요?
            </div>
            <div class="chat-main--content--message">
                실제로 신어볼 수 있는 건가요?
            </div>
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
    };
    const store = new Store();
    new Controller(store, views);
  }
}
