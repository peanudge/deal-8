import View from "@/page/View";
import { delegate, on } from "@/helper/eventHelpers";

import { qs } from "@/helper/selectHelpers";

const tag = "[MainHeaderView]";

export default class MainHeaderView extends View {
  constructor(element = qs("#main-header")) {
    console.log(tag, "constructor");
    super(element);
    this.categoryBtn = qs("#category-btn", this.element);
    this.currentCategoryNameElement = qs("#current-category", this.element);

    this.bindingEvents();
  }

  bindingEvents() {
    on(this.categoryBtn, "click", () => {
      this.showCategoryView();
    });
  }

  handleLocationToggleClick() {
    const locationMenu = qs("#location-menu");
    const currentState = locationMenu.style.display;
    if (currentState === "block") {
      locationMenu.style.display = "none";
    } else {
      locationMenu.style.display = "block";
    }
  }

  showCategoryView() {
    this.emit("@show-category");
  }

  show({ categoryName = "" }) {
    this.currentCategoryNameElement.innerText =
      categoryName !== "" ? categoryName : "All Category";
    super.show();
  }
}
