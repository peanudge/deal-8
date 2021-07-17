import { qs } from "@/helper/selectHelpers";
import View from "@/page/View";

export default class CategoryListView extends View {
  constructor(element = qs("#category-select-container")) {
    super(element);
    bindingEvents();
  }
  bindingEvents() {}

  show() {
    super.show();
  }
}
