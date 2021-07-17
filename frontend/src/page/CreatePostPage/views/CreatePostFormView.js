import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class CreatePostFormView extends View {
  constructor(element = qs("#posting-container")) {
    super(element);
    this.titleInputElement = qs("#title-input", this.element);
    this.categoryMenuBtnElement = qs("#category-btn", this.element);
    this.costInputElement = qs("#cost-input", this.element);
    this.commentAreaElement = qs("#comment-textarea", this.element);

    this.bindingEvents();
  }

  bindingEvents() {
    on(this.categoryMenuBtnElement, "click", (e) =>
      this.handleCategoryMenuBtn()
    );

    on(this.titleInputElement, "input", (e) => this.handleTitleChangeEvent(e));
    on(this.costInputElement, "input", (e) => this.handleCostChangeEvent(e));
    on(this.commentAreaElement, "input", (e) =>
      this.handleCommentChangeEvent(e)
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

  handleCommentChangeEvent(e) {
    const comment = e.target.innerText;
    this.emit("@change-comment", { value: comment });
  }

  handleCategoryMenuBtn() {
    this.emit("@show-select-category");
  }

  show({ title, cost, comment, category }) {
    this.titleInputElement.value = title;
    this.costInputElement.value = cost;
    this.commentAreaElement.innerText = comment;
    if (category) {
      const $textElement = qs(".category-name", this.categoryMenuBtnElement);
      $textElement.innerText = category;
    }
    super.show();
  }
}
