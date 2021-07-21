import { getChatRoomsAsync } from "@/api/chat";
import { getMySalingProductsAsync } from "@/api/product";
import {
  getInterestProductsAsync,
  addInterestProductAsync,
  removeInterestProductAsync,
  getOwnProductsAsync,
} from "@/api/user";
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
    this.tabView.on("@change-tab", (e) => this.changeTab(e.detail.value));
    this.interestProductListView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });
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
      // TODO: fetch chat Room List.
    }
    this.render();
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
    const { selectedTab, chatRooms, salingProducts, interestProducts } =
      this.store;

    this.tabView.show(selectedTab);

    if (selectedTab === TabType.SAIL_PRODUCT) {
      this.salingProductListView.show(salingProducts);
    } else if (selectedTab === TabType.CHAT) {
      this.chatRoomListView.show(chatRooms);
    } else if (selectedTab === TabType.INTEREST_PRODUCT) {
      this.interestProductListView.show(interestProducts);
    } else {
      throw "사용할 수 없는 탭입니다.";
    }
  }
}
