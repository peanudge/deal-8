import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class ModifyPostHeaderView extends View {
  constructor(element = qs("#posting-header")) {
    super(element);
    this.createBtnElement = qs("#Modify-btn", this.element);
    this.backBtn = qs("#Back-btn", this.element);

    console.log(this.createBtnElement);
    console.log(this.backBtn);
    this.bindingEvents();
  }
  bindingEvents() {
    on(this.createBtnElement, "click", () => this.handleCreatePostClickEvent());
    on(this.backBtn, "click", () => this.handleBackBtnClickEvent());
  }

  handleCreatePostClickEvent() {
    console.log("create clicked");
    this.emit("@create-post");
  }
  handleBackBtnClickEvent() {
    console.log("back clicked");
    this.emit("@go-to-back");
  }
  show() {
    super.show();
  }
}
