import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";

export default class NewProductButtonView extends View {
  constructor(element = qs("#new-product-btn")) {
    super(element);
    this.eventBinding();
  }

  eventBinding() {}

  show() {
    super.show();
  }
}
