import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class CreatePostFormView extends View {
  constructor(element = qs("#posting-container")) {
    super(element);
    this.titleInputElement = qs("#title-input", this.element);
    this.categoryMenuBtnElement = qs("#category-btn", this.element);
    this.bindingEvents();
  }

  bindingEvents() {
    on(this.categoryMenuBtnElement, "click", (e) =>
      this.handleCategoryMenuBtn()
    );

    on(this.titleInputElement, "input", (e) => this.handleTitleChangeEvent(e));
  }

  handleTitleChangeEvent() {
    console.log(e.target.value);
    // TODO: create custom event
  }

  handleCategoryMenuBtn() {
    this.emit("@show-select-category");
  }

  show() {
    super.show();
  }
}
