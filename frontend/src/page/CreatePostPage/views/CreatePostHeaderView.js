import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class CreatePostHeaderView extends View {
  constructor(element = qs("#posting-header")) {
    super(element);
    this.titleInputElement = qs("#title-input", this.element);
    this.categoryMenuBtnElement = qs("#category-btn", this.element);
    this.bindingEvents();
  }
  show() {
    super.show();
  }

  bindingEvents() {}
}
