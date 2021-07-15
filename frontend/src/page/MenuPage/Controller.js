import { TabType } from "./views/TabView";

const tag = "[Controller]";
export default class Controller {
  constructor(
    store,
    { tabView, salingProductListView, interestProductListView, chatListView }
  ) {
    console.log(tag, "constructor");
    this.store = store;

    this.tabView = tabView;
    this.salingProductListView = salingProductListView;
    this.interestProductListView = interestProductListView;
    this.chatListView = chatListView;

    this.subscribeViewEvents();
    this.render();
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
      console.log("Interest ON " + productId);
    } else {
      console.log("Interest OFF " + productId);
    }
  }

  changeTab(tab) {
    this.store.selectedTab = tab;
    this.render();
  }

  render() {
    const selectedTab = this.store.selectedTab;
    this.tabView.show(selectedTab);
    if (selectedTab === TabType.SAIL_PRODUCT) {
      this.salingProductListView.show();
      this.interestProductListView.hide();
      this.chatListView.hide();
    } else if (selectedTab === TabType.CHAT) {
      this.chatListView.show();
      this.salingProductListView.hide();
      this.interestProductListView.hide();
    } else if (selectedTab === TabType.INTEREST_PRODUCT) {
      this.interestProductListView.show();
      this.chatListView.hide();
      this.salingProductListView.hide();
    } else {
      throw "사용할 수 없는 탭입니다.";
    }
  }
}
