import { navigateTo } from "@/router";

import { getProductDetail } from "@/api/product";
import { getProfileAsync } from "@/api/user";

const tag = "[ProductDetail Controller]";

export default class Controller {
  constructor(
    store,
    {
      productDetailHeaderView,
      productImageListView,
      productDetailView,
      productDetailFooterView,
    },
  ) {
    this.store = store;
    this.productId = store.productId;
    this.productDetailHeaderView = productDetailHeaderView;
    this.productImageListView = productImageListView;
    this.productDetailView = productDetailView;
    this.productDetailFooterView = productDetailFooterView;

    this.subscribeViewEvents();
    this.init();
  }

  subscribeViewEvents() {
    this.productDetailFooterView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });

    this.productDetailHeaderView.on("@modifyPost", () => {
      navigateTo(`/product-edit/${this.store.productId}`);
    });
    this.productDetailHeaderView.on("@deletePost", () => {
      navigateTo(`/product-edit/${this.store.productId}`);
    });
  }

  changeInterest(productId, isInterested) {
    if (isInterested) {
      console.log("Interest ON " + productId);
    } else {
      console.log("Interest OFF " + productId);
    }
  }

  init() {
    if (this.productId === undefined) {
      navigateTo("/");
    }

    const getUserRequest = getProfileAsync();
    const getProductRequest = getProductDetail({ id: this.productId });

    Promise.all([getUserRequest, getProductRequest]).then(
      ([user, productDetail]) => {
        this.store.user = user;
        this.store.productDetail = productDetail;
        this.render();
      },
    );
  }

  render() {
    const productDetail = this.store.productDetail;
    const user = this.store.user;
    this.productDetailHeaderView.show(user, productDetail);
    this.productImageListView.show(productDetail.images);
    this.productDetailView.show(user, productDetail);
    this.productDetailFooterView.show(user, productDetail);
  }
}
