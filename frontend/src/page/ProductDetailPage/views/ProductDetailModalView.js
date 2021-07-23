import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import ModalView from "@/common/views/ModalView";

export default class ProductDetailModalView extends ModalView {
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
    this.blurBgElement.style.visibility = "visible";
    super.show();
  }
  hide() {
    this.blurBgElement.style.visibility = "hidden";
    super.hide();
  }
}
