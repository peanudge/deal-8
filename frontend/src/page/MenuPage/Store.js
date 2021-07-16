import { TabType } from "./views/TabView.js";

export default class Store {
  constructor() {
    this.selectedTab = TabType.INTEREST_PRODUCT;
    this.chatRooms = [];
    this.interestProducts = [];
    this.salingProducts = [];
  }
}
