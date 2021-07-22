import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class ModifyPostHeaderView extends View {
  constructor(element = qs("#posting-header")) {
    super(element);
    this.backBtnElement = qs("#back-btn", this.element);
    this.modifyBtnElement = qs("#modify-btn", this.element);
    this.bindingEvents();
  }
  bindingEvents() {
    on(this.modifyBtnElement, "click", () => this.handleCreatePostClickEvent());
    on(this.backBtnElement, "click", () => this.handleBackBtnClickEvent());
  }

  handleCreatePostClickEvent() {
    this.emit("@modify-post");
  }

  handleBackBtnClickEvent() {
    this.emit("@go-to-back");
  }
  show() {
    super.show();
  }
}
