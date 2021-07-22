import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
export default class ModalBlurBGView extends View {
  constructor(element = qs("#modal-blur-bg")) {
    super(element);
    this.bindingEvents();
  }
  bindingEvents() {
    on(this.element, "click", () => {
      this.emit("@outfocus-modal");
    });
  }
}
