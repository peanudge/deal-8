import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import View from "@/page/View";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";

import "@/public/css/categorySelect.css";

export default class CategorySelectView extends View {
  constructor(element = qs("#category-select-view")) {
    super(element);
    this.template = new Template();
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#back-btn", () =>
      this.handleClickBackButtonEvent()
    );

    delegate(this.element, "click", ".category-list--item", (e) =>
      this.handleClickCategoryEvent(e)
    );
  }

  handleClickCategoryEvent(e) {
    const categoryId = e.target.dataset.id;
    this.emit("@select-category", { value: categoryId });
  }

  handleClickBackButtonEvent() {
    this.emit("@back");
  }

  show(categories = []) {
    this.element.innerHTML = this.template.getCategorySeletView(categories);
    super.show();
  }
}

class Template {
  getCategorySeletView(categories) {
    return /* html */ `
    <header class="header">
        <div class="header--left">
          <div id="back-btn" class="back-icon">${chevronLeftSVG}</div>
        </div>
        <h1 class="header--center">
            <span class="header--center--title"> 카테고리 </span>
        </h1>
    </header>
    <div class="category-list">${this._getCategoryItems(categories)}</div>
    `;
  }

  _getCategoryItems(categories) {
    return categories
      .map((category) => this._getCategoryItem(category))
      .join("");
  }

  _getCategoryItem(category) {
    const { id, name } = category;
    return `<div class="category-list--item" data-id=${id}>${name}</div>`;
  }
}
