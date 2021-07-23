import {
  getAllProductsAsync,
  getProductsAsync,
  getCategoriesAsync,
} from "@/api/product";
import {
  addInterestProductAsync,
  getProfileAsync,
  removeInterestProductAsync,
} from "@/api/user";
import { navigateTo } from "@/router";

export default class Controller {
  constructor(
    store,
    {
      mainHeaderView,
      productListView,
      categoryView,
      locationDropDownView,
      newProductButtonView,
    }
  ) {
    this.store = store;

    this.mainHeaderView = mainHeaderView;
    this.productListView = productListView;
    this.categoryView = categoryView;
    this.locationDropDownView = locationDropDownView;
    this.newProductButtonView = newProductButtonView;

    this.subscribeViewEvents();
    this.isShowCategoryView = false;

    this.init();
    this.render();
  }

  init() {
    this.fetchUserData();
  }

  fetchUserData() {
    getProfileAsync().then(({ isAuth, account }) => {
      if (isAuth) {
        this.store.isAuth = isAuth;
        this.store.user = account;
        this.store.currentLocation =
          account.locations.length > 0 ? account.locations[0] : "";
      } else {
        this.store.currentLocation = "";
      }
      this.fetchProductData();
    });
  }

  subscribeViewEvents() {
    this.productListView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });

    this.categoryView.on("@show-main", () => this.showMain());

    this.mainHeaderView.on("@show-category", () => this.showCategory());

    this.categoryView.on("@search", (e) => {
      const { id, name } = e.detail.value;
      this.searchCategory(id, name);
    });

    this.locationDropDownView.on("@change-item", (e) => {
      const location = e.detail.value;
      this.changeLocation(location);
    });
  }

  fetchProductData() {
    getProductsAsync({
      location: this.store.currentLocation,
      categoryId: this.store.currentCategoryId,
    }).then((products) => {
      this.store.products = products;
      this.render();
    });
  }

  changeLocation(location) {
    if (location) {
      this.store.currentLocation = location;
      this.fetchProductData();
    }
  }

  showMain() {
    this.isShowCategoryView = false;
    this.render();
  }

  showCategory() {
    this.isShowCategoryView = true;
    getCategoriesAsync().then(({ categories }) => {
      this.store.categoryList = categories;
      this.render();
    });
  }

  searchCategory(categoryId, categoryName) {
    this.store.currentCategoryId = categoryId;
    this.store.currentCategoryName = categoryName;
    this.isShowCategoryView = false;
    this.fetchProductData();
  }

  changeInterest(productId, isInterested) {
    if (this.store.isAuth) {
      if (isInterested) {
        addInterestProductAsync(productId).then(() => {
          this.fetchProductData();
        });
      } else {
        removeInterestProductAsync(productId).then(() => {
          this.fetchProductData();
        });
      }
    } else {
      navigateTo("/login");
    }
  }

  render() {
    const {
      products,
      isAuth,
      user,
      currentLocation,
      currentCategoryName,
      categoryList,
    } = this.store;

    if (this.isShowCategoryView) {
      this.categoryView.show(categoryList);
      this.mainHeaderView.hide();
      this.locationDropDownView.hide();
      this.productListView.hide();
    } else {
      this.categoryView.hide();
      this.mainHeaderView.show({
        categoryName: currentCategoryName,
      });
      this.productListView.show(products);

      const locationText = currentLocation ? currentLocation : "All";
      this.locationDropDownView.show(locationText, user.locations);
    }

    if (isAuth) {
      this.newProductButtonView.show();
    } else {
      this.newProductButtonView.hide();
    }
  }
}
