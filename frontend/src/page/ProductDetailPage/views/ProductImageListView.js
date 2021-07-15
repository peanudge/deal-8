import View from '@/page/View';

import { qs } from '@/helper/selectHelpers';

import chevronLeftSvg from '@/public/svg/chevron-left.svg';
import moreVertival from '@/public/svg/more-vertical.svg';

const tag = '[ProductImageListView]';

export default class ProductImageListView extends View {
  constructor(
    element = qs('div.post-main--img-container'),
    template = new Template(),
  ) {
    console.log(tag, 'constructor');
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {}

  show(images) {
    this.element.innerHTML = this.template.getImages(images);
    super.show();
  }
}

class Template {
  imagesToElements(images) {
    const elementArray = images.map((image) => `<img src=${image} />`);
    return elementArray.join('');
  }
  getImages(images) {
    return `
        ${this.imagesToElements(images)}
    `;
  }
}
