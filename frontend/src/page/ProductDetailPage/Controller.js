import { signupAsync } from '@/api/auth';
import { navigateTo } from '@/router';

import { getProductDetail } from '@/api/product';

const tag = '[ProductDetail Controller]';

export default class Controller {
  constructor({ productId, productDetailHeaderView, productImageListView }) {
    this.productId = productId;
    this.productDetailHeaderView = productDetailHeaderView;
    this.productImageListView = productImageListView;
    this.subscribeViewEvents();
    this.init();
  }

  subscribeViewEvents() {}

  init() {
    if (this.productId === undefined) {
      return 'unknown product';
      // TODO alert and redirect to main
    }

    getProductDetail(this.productId).then((productDetail) => {
      const { images } = productDetail;

      this.render({ images });
    });
  }

  render({ images }) {
    this.productDetailHeaderView.show();
    this.productImageListView.show(images);
  }
}
