import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class ModifyPostFormView extends View {
  constructor(element = qs("#posting-container")) {
    super(element);
    this.titleInputElement = qs("#title-input", this.element);
    this.categoryMenuBtnElement = qs("#category-btn", this.element);
    this.costInputElement = qs("#cost-input", this.element);
    this.contentAreaElement = qs("#content-textarea", this.element);
    this.locationElement = qs("#location-name", this.element);
    this.bindingEvents();
  }

  bindingEvents() {
    on(this.categoryMenuBtnElement, "click", (e) =>
      this.handleCategoryMenuBtn()
    );

    on(this.titleInputElement, "input", (e) => this.handleTitleChangeEvent(e));
    on(this.costInputElement, "input", (e) => this.handleCostChangeEvent(e));
    on(this.contentAreaElement, "input", (e) =>
      this.handleContentChangeEvent(e)
    );
  }

  handleTitleChangeEvent(e) {
    const title = e.target.value;
    this.emit("@change-title", { value: title });
  }
  handleCostChangeEvent(e) {
    const cost = e.target.value;
    this.emit("@change-cost", { value: Number(cost) });
  }

  handleContentChangeEvent(e) {
    const content = e.target.innerText;
    this.emit("@change-content", { value: content });
  }

  handleCategoryMenuBtn() {
    this.emit("@show-select-category");
  }

  show({ title, cost, content, category, location }, error = {}) {
    this.titleInputElement.value = title;
    if (error["title"]) {
      this.titleInputElement.placeholder = error["title"];
      this.titleInputElement.classList.add("error");
    } else {
      this.titleInputElement.classList.remove("error");
    }
    this.costInputElement.value = cost;
    this.contentAreaElement.innerText = content;
    this.locationElement.innerText = location;

    const $textElement = qs(".category-name", this.categoryMenuBtnElement);
    if (category) {
      $textElement.innerText = category;
    }
    if (error["category"]) {
      $textElement.classList.add("error");
    } else {
      $textElement.classList.remove("error");
    }

    super.show();
  }
}
