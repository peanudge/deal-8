const tag = "[HomePage Controller]";

import { getAllProducts, getProducts } from "@/api/product";
import { getProfileAsync } from "@/api/user";

export default class Controller {
  constructor(store, { mainHeaderView, productListView, categoryView }) {
    this.store = store;

    this.mainHeaderView = mainHeaderView;
    this.productListView = productListView;
    this.categoryView = categoryView;

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
  }

  fetchData() {
    const requestProducts = getAllProducts();
    const requestUserProfile = getProfileAsync();
    Promise.all([requestProducts, requestUserProfile]).then(
      ([products, user]) => {
        this.store.user = user;
        this.store.products = products;
        this.render();
      }
    );
  }

  searchCategory(categoryId) {
    this.isOnCategory = false;

    getProducts(categoryId).then((data) => {
      console.log(this.isOnCategory);
      console.log(data);
      this.render(data);
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
    const { products, user } = this.store;
    if (this.isOnCategory) {
      this.categoryView.show();
      this.mainHeaderView.hide();
      this.productListView.hide();
    } else {
      this.categoryView.hide();
      this.mainHeaderView.show(user);
      this.productListView.show(products);
    }
  }
}
