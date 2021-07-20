import { getChatRoomsAsync } from "@/api/chat";
import { getMySalingProductsAsync } from "@/api/product";
import {
  getInterestProductsAsync,
  addInterestProductAsync,
  removeInterestProductAsync,
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
    console.log(tag, "constructor");
    this.store = store;

    this.tabView = tabView;
    this.salingProductListView = salingProductListView;
    this.interestProductListView = interestProductListView;
    this.chatRoomListView = chatRoomListView;

    this.subscribeViewEvents();
    this.render();
    // this.fetchData();
    this.fetchInterestProductData();
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
    this.fetchData();
    this.render();
  }

  fetchData() {
    const requestChatRoom = getChatRoomsAsync();
    const requestSalingProducts = getMySalingProductsAsync();

    Promise.all([requestChatRoom, requestSalingProducts]).then(
      ([chatRooms, salingProducts]) => {
        this.store.chatRooms = chatRooms;
        this.store.salingProducts = salingProducts;
        this.render();
      }
    );
  }

  fetchInterestProductData() {
    getInterestProductsAsync().then(({ success, products }) => {
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
