import {
  getAllProductsAsync,
  getProductsAsync,
  getCategoriesAsync,
} from "@/api/product";
import { getProfileAsync } from "@/api/user";

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
    this.fetchData();

    this.isShowCategoryView = false;
    this.render();
  }

  subscribeViewEvents() {
    this.productListView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });

    this.categoryView.on("@show-main", () => this.showMain());

    this.mainHeaderView.on("@show-category", () => this.showCategory());

    this.categoryView.on("@search", (e) => {
      const categoryId = e.detail.value;
      this.searchCategory(categoryId);
    });

    this.locationDropDownView.on("@change-item", (e) => {
      const location = e.detail.value;
      this.changeLocation(location);
    });
  }

  fetchData() {
    const requestUserProfile = getProfileAsync();

    requestUserProfile
      .then(({ isAuth, account }) => {
        if (isAuth) {
          this.store.isAuth = isAuth;
          this.store.user = account;
          this.store.currentLocation =
            account.locations.length > 0 ? account.locations[0] : "";
        } else {
          this.store.currentLocation = "";
        }
        return getProductsAsync({
          location: this.store.currentLocation,
          categoryId: this.store.currentCategory,
        });
      })
      .then((products) => {
        this.store.products = products;
        this.render();
      });
  }

  changeLocation(location) {
    if (location) {
      this.store.currentLocation = location;
      this.render();

      getProductsAsync({
        location,
      }).then((data) => {
        this.store.products = data;
        this.render();
      });
    }
  }

  showMain() {
    this.isShowCategoryView = false;
    this.render();
  }

  showCategory() {
    this.isShowCategoryView = true;
    getCategoriesAsync().then(({ category }) => {
      this.store.categoryList = category;
      this.render();
    });
  }

  searchCategory(categoryId) {
    this.isShowCategoryView = false;

    getProductsAsync({ categoryId }).then((data) => {
      this.store.products = data;
      this.render();
    });
  }

  changeInterest(productId, isInterested) {
    if (isInterested) {
      console.log("Interest ON " + productId);
    } else {
      console.log("Interest OFF " + productId);
    }
  }

  render() {
    const { products, isAuth, user, currentLocation, categoryList } =
      this.store;

    if (this.isShowCategoryView) {
      this.categoryView.show(categoryList);
      this.mainHeaderView.hide();
      this.locationDropDownView.hide();
      this.productListView.hide();
    } else {
      this.categoryView.hide();
      this.mainHeaderView.show(user);
      this.productListView.show(products);
      this.locationDropDownView.show(currentLocation, user.locations);
    }

    if (isAuth) {
      this.newProductButtonView.show();
    } else {
      this.newProductButtonView.hide();
    }
  }
}
