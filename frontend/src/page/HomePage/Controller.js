import { getAllProductsAsync, getProducts } from "@/api/product";
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

    this.isOnCategory = false;
    this.render();
  }

  subscribeViewEvents() {
    this.productListView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });

    this.categoryView.on("@show-main", (e) => {
      this.isOnCategory = false;
      // TODO: Cache previous
      this.fetchData();
      this.render();
    });

    this.mainHeaderView.on("@show-category", (e) => {
      this.isOnCategory = true;
      this.render();
    });

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
    const requestProducts = getAllProductsAsync();
    const requestUserProfile = getProfileAsync();
    Promise.all([requestProducts, requestUserProfile]).then(
      ([products, { isAuth, account }]) => {
        if (isAuth) {
          this.store.isAuth = isAuth;
          this.store.user = account;
          this.store.currentLocation =
            account.locations.length > 0 ? account.locations[0] : "";
          this.store.products = products;
          this.render();
        } else {
          this.store.products = products;
          this.render();
        }
      }
    );
  }

  changeLocation(location) {
    this.store.currentLocation = location;
    this.render();

    getProducts({
      location,
    }).then((data) => {
      this.store.products = data;
      this.render();
    });
  }

  searchCategory(categoryId) {
    this.isOnCategory = false;

    getProducts(categoryId).then((data) => {
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
    const { products, isAuth, user, currentLocation } = this.store;
    if (this.isOnCategory) {
      this.categoryView.show();
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
