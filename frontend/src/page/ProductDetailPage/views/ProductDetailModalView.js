import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class ProductDetailModalView extends View {
  constructor(element = qs("#post-delete-modal")) {
    super(element);
    this.blurBgElement = qs("#modal-blur-bg");
    this.accpetBtnElement = qs("#accept-btn", this.element);
    this.cancelBtnElement = qs("#cancel-btn", this.element);
    this.bindingEvents();
  }
  bindingEvents() {
    on(this.accpetBtnElement, "click", (e) => {
      this.emit("@delete-post");
    });
    on(this.cancelBtnElement, "click", (e) => {
      this.emit("@close-modal");
    });
  }

  show() {
    this.blurBgElement.style.display = "block";
    super.show();
  }
  hide() {
    this.blurBgElement.style.display = "none";
    super.hide();
  }
}
