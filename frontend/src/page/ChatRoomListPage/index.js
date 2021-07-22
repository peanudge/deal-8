import AbstractPage from "../AbstractPage";

import Controller from "./Controller";
import Store from "./Store";

import ChatRoomListHeaderView from "./views/ChatRoomListHeaderView";
import ChatroomListContentView from "./views/ChatRoomListContentView";

export default class ChatRoomListPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.productId = params.productId;
  }
  async render() {
    return /*html*/ `
      <header class="header">
      
      </header>
      <div class="content">
      </div>  
    `;
  }

  after_render() {
    const views = {
      chatRoomListHeaderView: new ChatRoomListHeaderView(),
      chatRoomListContentView: new ChatroomListContentView(),
    };
    const store = new Store(this.productId);
    new Controller(store, views);
  }
}
