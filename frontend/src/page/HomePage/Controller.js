const tag = "[HomePage Controller]";

import { getAllProducts, getProducts } from "@/api/product";

export default class Controller {
  constructor({ mainHeaderView, productListView, categoryView }) {
    console.log(tag);
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

    this.mainHeaderView.on("@toggle-location-dropbar", (e) => {
      const dropdown = e.detail;
      const currentState = dropdown.style.display;
      if (currentState === "none" || !currentState) {
        dropdown.style.display = "block";
      } else {
        dropdown.style.display = "none";
      }
    });
  }

  fetchData() {
    getAllProducts().then((data) => {
      this.render(data);
    });
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

  render(data) {
    if (this.isOnCategory) {
      this.categoryView.show();
      this.mainHeaderView.hide();
      this.productListView.hide();
    } else {
      this.categoryView.hide();
      this.mainHeaderView.show();
      this.productListView.show(data);
    }
  }
}
