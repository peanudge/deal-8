const tag = "[HomePage Controller]";

import { getProducts } from "@/api/product";

export default class Controller {
  constructor({ mainHeaderView, productListView }) {
    console.log(tag);
    this.mainHeaderView = mainHeaderView;
    this.productListView = productListView;

    this.subscribeViewEvents();
    this.init();
    this.render();
  }

  init() {
    getProducts().then((data) => this.productListView.show(data));
  }

  subscribeViewEvents() {
    this.productListView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      if (isInterested) this.addInterest(id);
      else this.removeInterest(id);
    });
  }

  addInterest(id) {
    console.log("Interest ON " + id);
    //TODO: api call
  }
  removeInterest(id) {
    console.log("Interest OFF " + id);
    //TODO: api call
  }
  render() {
    this.mainHeaderView.show();
    this.productListView.show();
  }
}
