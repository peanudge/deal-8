const tag = '[HomePage Controller]';

import { getProduct } from '@/api/product';

export default class Controller {
  constructor({ mainHeaderView, productListView }) {
    console.log(tag);
    this.mainHeaderView = mainHeaderView;
    this.productListView = productListView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    // TODO: binding event
  }

  render() {
    getProduct().then((data) => this.productListView.show(data));
    this.mainHeaderView.show();
  }
}
