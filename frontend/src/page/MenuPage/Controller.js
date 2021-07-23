import {
  getInterestProductsAsync,
  addInterestProductAsync,
  removeInterestProductAsync,
  getOwnProductsAsync,
  getMyChatRoomsAsync,
} from "@/api/user";

import { deleteProductById } from "@/api/product";

import { navigateTo } from "@/router";
import { TabType } from "./views/TabView";

export default class Controller {
  constructor(
    store,
    {
      tabView,
      salingProductListView,
      interestProductListView,
      chatRoomListView,
      modalBlurBGView,
      settingMenuModalView,
    }
  ) {
    this.store = store;

    this.tabView = tabView;
    this.salingProductListView = salingProductListView;
    this.interestProductListView = interestProductListView;
    this.chatRoomListView = chatRoomListView;

    this.isShowSettingModal = false;
    this.settingMenuModalView = settingMenuModalView;
    this.modalBlurBGView = modalBlurBGView;

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

    this.salingProductListView.on("@setting", (e) => {
      const { id } = e.detail.value;
      this.store.settingProductId = Number(id);
      this.showSettingMenuModal();
    });

    this.modalBlurBGView.on("@outfocus-modal", (e) => {
      this.hideSettingMenuModal();
    });

    this.settingMenuModalView.on("@cancel", () => {
      this.hideSettingMenuModal();
    });

    this.settingMenuModalView.on("@delete", () => {
      const productId = this.store.settingProductId;
      deleteProductById(productId).then(({ success }) => {
        if (success) {
          this.fetchOwnProductData();
          this.hideSettingMenuModal();
        } else {
          throw "상품 삭제 실패";
        }
      });
    });

    this.settingMenuModalView.on("@edit", (e) => {
      const productId = this.store.settingProductId;
      navigateTo("/modifyPost/" + productId, { previous: "/menu" });
    });
  }

  showSettingMenuModal() {
    this.isShowSettingModal = true;
    this.render();
  }

  hideSettingMenuModal() {
    this.isShowSettingModal = false;
    this.render();
  }

  moveToChatRoom(roomId) {
    navigateTo("/chat/" + roomId, { previous: "/menu" });
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

    if (this.isShowSettingModal) {
      this.settingMenuModalView.show();
      this.modalBlurBGView.show();
    } else {
      this.settingMenuModalView.hide();
      this.modalBlurBGView.hide();
    }
  }
}
