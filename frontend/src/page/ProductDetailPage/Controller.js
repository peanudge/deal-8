import { signupAsync } from '@/api/auth';
import { navigateTo } from '@/router';

import { getProductDetail } from '@/api/product';

const tag = '[ProductDetail Controller]';

export default class Controller {
  constructor({
    productId,
    productDetailHeaderView,
    productImageListView,
    productDetailView,
    productDetailFooterView,
  }) {
    this.productId = productId;
    this.productDetailHeaderView = productDetailHeaderView;
    this.productImageListView = productImageListView;
    this.productDetailView = productDetailView;
    this.productDetailFooterView = productDetailFooterView;

    this.subscribeViewEvents();
    this.init();
  }

  subscribeViewEvents() {}

  init() {
    if (this.productId === undefined) {
      return 'unknown product';
      // TODO alert and redirect to main
    }

    getProductDetail({ id: this.productId }).then((productDetail) => {
      this.render(productDetail);
    });
  }

  render(productDetail) {
    this.productDetailHeaderView.show();
    this.productImageListView.show(productDetail.images);
    this.productDetailView.show(productDetail);
    this.productDetailFooterView.show(productDetail);
  }
}
