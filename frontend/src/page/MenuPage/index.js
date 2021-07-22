import AbstractPage from "../AbstractPage";
import TabView from "./views/TabView";
import Controller from "./Controller";

import ProductListView from "@/common/views/ProductListView";
import ChatRoomListView from "./views/ChatRoomListView";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";

import { qs } from "@/helper/selectHelpers";

import "@/public/css/menu.css";
import Store from "./Store";
import SettingMenuModalView from "./views/SettingMenuModalView";
import ModalBlurBGView from "./views/ModelBlurBGView";

export default class MenuPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("MenuPage");
  }

  async render() {
    return /*html*/ `
    <header class="header">
        <a class="header--left" href="/" data-link>
          <div class="back-icon">${chevronLeftSVG}</div>
        </a>
        <h1 class="header--center">
          <span class="header--center--title"> 메뉴 </span>
        </h1>
    </header>
    <div id="tab-bar" class="tab-bar">
    </div>
    <div class="slide-wrapper">
        <div class="section-wrapper">
            <section id="product-list-window"></section>
            <section id="chat-list-window"></section>
            <section id="interest-list-window"></section>
        </div>
    </div>
    <div id="modal-blur-bg" class="blur-bg"></div>
    <div id="setting-menu-modal" class="action-modal">
      <div class="action-modal--menu">
        <div id="setting-edit-btn" class="action-modal--menu--item">수정</div>
        <div id="setting-delete-btn" class="action-modal--menu--item">삭제</div>  
      </div>
      <div class="action-modal--cancel">
        취소
      </div>
    </div>
    `;
  }

  async after_render() {
    const store = new Store();

    const salingProductListView = new ProductListView(
      qs("#product-list-window"),
      {
        showInterestBtn: false,
        showSettingBtn: true,
        showChatMark: true,
        showInterestMark: false,
        emptyMessage: "등록한 상품이 없습니다.",
      }
    );

    const interestProductListView = new ProductListView(
      qs("#interest-list-window"),
      {
        showInterestBtn: true,
        showSettingBtn: false,
        showChatMark: true,
        showInterestMark: false,
        emptyMessage: "관심을 표시한 상품이 없습니다.",
      }
    );

    const views = {
      tabView: new TabView(),
      salingProductListView,
      interestProductListView,
      chatRoomListView: new ChatRoomListView(),
      settingMenuModalView: new SettingMenuModalView(),
      modalBlurBGView: new ModalBlurBGView(),
    };

    new Controller(store, views);
  }
}
