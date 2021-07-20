import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";

const tag = "[CategoryView]";

export default class CategoryView extends View {
  constructor(element = qs("#category"), template = new Template()) {
    super(element);
    this.template = template;
    this.bindingEvent();
  }

  bindingEvent() {
    delegate(this.element, "click", "#back-btn", (_) => this.handleBackClick());
    delegate(this.element, "click", "#category-item", (e) =>
      this.handleCategoryItemClick(e)
    );
  }

  handleCategoryItemClick(e) {
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    this.emit("@search", { value: { id, name } });
  }

  handleBackClick() {
    this.emit("@show-main");
  }

  show(categories = []) {
    this.element.innerHTML = ` 
        <header class="header">
            <div class="header--left">
              <div id="back-btn" class="back-icon">${chevronLeftSVG}</div>
            </div>
            <h1 class="header--center">
                <span class="header--center--title"> 카테고리 </span>
            </h1>
        </header>
        <main class="category-main">
        ${this.template.getAllCategoryCard()}
        ${categories
          .map((item) => this.template.getCategoryCard(item.id, item.name))
          .join("")}
        </main>`;

    super.show();
  }
}

class Template {
  getAllCategoryCard() {
    return `
      <div id="category-item" class="category-main--card">
        <div class="category-main--card--icon"></div>
        <div class="category-main--card--title">모든 카테고리</div>
      </div>
    `;
  }
  getCategoryCard(categoryid, name) {
    return `
      <div id="category-item" class="category-main--card" data-id=${categoryid} data-name=${name}>
        <div class="category-main--card--icon"></div>
        <div class="category-main--card--title">${name}</div>
      </div>
    `;
  }
}
