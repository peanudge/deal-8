import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import chevronLeftSvg from "@/public/svg/chevron-left.svg";
import chevronRightSvg from "@/public/svg/chevron-right.svg";

const tag = "[ProductImageListView]";

export default class ProductImageListView extends View {
  constructor(
    element = qs("div.post-main--img-container"),
    template = new Template(),
  ) {
    console.log(tag, "constructor");
    super(element);
    this.template = template;
    this.bindingEvents();
    this.currentImageIndex = 0;
    this.imageLength = 0;
    this.$images;
    this.SLIDETIME = 500;
  }

  bindingEvents() {
    delegate(this.element, "click", ".buttons > button", (event) => {
      this.handleMoveButtonClick(event);
    });
  }

  show(images) {
    this.element.innerHTML = this.template.getImages(images);
    this.imageLength = images.length;
    this.$images = qs(".images", this.element);
    super.show();
  }

  getImageContentLeft(index) {
    return `${-1 * (index * 100)}%`;
  }

  animateImageContent({ currentLeft, left }) {
    console.log(`current left : ${currentLeft}\nleft : ${left}`);
    this.$images.animate(
      [
        { transform: `translateX(${currentLeft})` },
        { transform: `translateX(${left})` },
      ],
      this.SLIDETIME,
    );
    this.$images.style.transform = `translateX(${left})`;
  }

  handleMoveButtonClick(event) {
    const moveValue = Number(event?.target?.dataset?.move);
    console.log(moveValue);
    let tmpImageIndex = this.currentImageIndex + moveValue;

    const isFirstNow = tmpImageIndex === -1;
    const isLastNow = tmpImageIndex === this.imageLength;
    if (isFirstNow || isLastNow) {
      isFirstNow ? (tmpImageIndex = 0) : (tmpImageIndex = this.imageLength - 1);
      return;
    }

    const currentLeft = this.getImageContentLeft(this.currentImageIndex);
    const newLeft = this.getImageContentLeft(tmpImageIndex);
    this.currentImageIndex = tmpImageIndex;
    this.animateImageContent({ currentLeft: currentLeft, left: newLeft });
  }
}

class Template {
  imagesToElements(images) {
    const elementArray = images.map(
      (image) => `
      <img src=${image} />
    `,
    );
    return elementArray.join("");
  }
  getImages(images) {
    console.log("get images");
    return `
        <div class="images">
          ${this.imagesToElements(images)}
        </div>
        <div class="buttons">
          <button data-move=-1>${chevronLeftSvg}</button>
          <button data-move=1>${chevronRightSvg}</button>
        </div>
    `;
  }
}
