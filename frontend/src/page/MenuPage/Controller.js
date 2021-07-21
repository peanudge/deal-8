import {
  getInterestProductsAsync,
  addInterestProductAsync,
  removeInterestProductAsync,
  getOwnProductsAsync,
  getMyChatRoomsAsync,
} from "@/api/user";
import { navigateTo } from "@/router";
import { TabType } from "./views/TabView";

const tag = "[Controller]";
export default class Controller {
  constructor(
    store,
    {
      tabView,
      salingProductListView,
      interestProductListView,
      chatRoomListView,
    }
  ) {
    this.store = store;

    this.tabView = tabView;
    this.salingProductListView = salingProductListView;
    this.interestProductListView = interestProductListView;
    this.chatRoomListView = chatRoomListView;

    this.subscribeViewEvents();
    this.render();
    this.changeTab(TabType.SAIL_PRODUCT);
  }

  subscribeViewEvents() {
    this.chatRoomListView.on("@move-to-chat", (e) =>
      this.moveToChatRoom(e.detail.value)
    );
    this.tabView.on("@change-tab", (e) => this.changeTab(e.detail.value));
    this.interestProductListView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });
  }

  moveToChatRoom(roomId) {
    console.log(roomId);
    navigateTo("/chat/" + roomId);
  }

  changeInterest(productId, isInterested) {
    if (isInterested) {
      addInterestProductAsync(productId).then((result) => {
        this.fetchInterestProductData();
      });
    } else {
      removeInterestProductAsync(productId).then((result) => {
        this.fetchInterestProductData();
      });
    }
  }

  changeTab(tab) {
    this.store.selectedTab = tab;
    if (tab === TabType.INTEREST_PRODUCT) {
      this.fetchInterestProductData();
    } else if (tab === TabType.SAIL_PRODUCT) {
      this.fetchOwnProductData();
    } else if (tab === TabType.CHAT) {
      this.fetchMyChatData();
    }
    this.render();
  }

  fetchMyChatData() {
    getMyChatRoomsAsync().then(({ chatRoomListItems }) => {
      this.store.chatRoomListItems = chatRoomListItems;
      this.render();
    });
  }

  fetchOwnProductData() {
    getOwnProductsAsync().then(({ products }) => {
      this.store.salingProducts = products;
      this.render();
    });
  }

  fetchInterestProductData() {
    getInterestProductsAsync().then(({ products }) => {
      this.store.interestProducts = products;
      this.render();
    });
  }

  render() {
    const { selectedTab, chatRoomListItems, salingProducts, interestProducts } =
      this.store;

    this.tabView.show(selectedTab);

    if (selectedTab === TabType.SAIL_PRODUCT) {
      this.salingProductListView.show(salingProducts);
    } else if (selectedTab === TabType.CHAT) {
      this.chatRoomListView.show(chatRoomListItems);
    } else if (selectedTab === TabType.INTEREST_PRODUCT) {
      this.interestProductListView.show(interestProducts);
    } else {
      throw "사용할 수 없는 탭입니다.";
    }
  }
}
