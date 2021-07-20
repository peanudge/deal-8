export default class Store {
  constructor() {
    this.isAuth = false;
    this.products = [];
    this.user = {};
    this.currentLocation = "";
    this.currentCategoryId = null;
    this.currentCategoryName = "";
    this.categoryList = [];
  }
}
