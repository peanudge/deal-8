import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class ModifyPostHeaderView extends View {
  constructor(element = qs("#posting-header")) {
    super(element);
    this.createBtnElement = qs("#Modify-btn", this.element);
    this.bindingEvents();
  }
  bindingEvents() {
    on(this.createBtnElement, "click", () => this.handleCreatePostClickEvent());
  }

  handleCreatePostClickEvent() {
    this.emit("@create-post");
  }
  show() {
    super.show();
  }
}
