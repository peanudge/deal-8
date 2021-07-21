import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

const tag = "[TabView]";

export const TabType = {
  SAIL_PRODUCT: "SAIL_PRODUCT",
  CHAT: "CHAT",
  INTEREST_PRODUCT: "INTEREST_PRODUCT",
};

const TabLabel = {
  [TabType.SAIL_PRODUCT]: "판매목록",
  [TabType.CHAT]: "채팅",
  [TabType.INTEREST_PRODUCT]: "관심목록",
};

const TabSlidingIndex = {
  [TabType.SAIL_PRODUCT]: 0,
  [TabType.CHAT]: 1,
  [TabType.INTEREST_PRODUCT]: 2,
};

export default class TabView extends View {
  constructor(element = qs("#tab-bar")) {
    super(element);
    this.slideContainer = qs(".section-wrapper");
    this.template = new Template();
    this.bindEvents();
  }

  bindEvents() {
    delegate(this.element, "click", "li", (event) => this.handleClick(event));
  }

  handleClick(event) {
    const value = event.target.dataset.tab;
    this.emit("@change-tab", { value });
  }

  show(currentTabType = TabType.SAIL_PRODUCT) {
    const slidingIndex = TabSlidingIndex[currentTabType];
    this.slideTab(slidingIndex);
    this.element.innerHTML = this.template.getTabList(currentTabType);
    super.show();
  }

  slideTab(index) {
    const left = `-${index * 100}%`;
    this.slideContainer.style.left = left;
  }
}

class Template {
  getTabList(currentTabType) {
    return `
        <ul class="tab-bar--tabs">
          ${Object.values(TabType)
            .map((tabType) => ({
              tabType,
              tabLabel: TabLabel[tabType],
              select: currentTabType === tabType,
            }))
            .map(this._getTab)
            .join("")}
        </ul>
      `;
  }

  _getTab({ tabType, tabLabel, select }) {
    return `
        <li data-tab="${tabType}" class="${select && "select"}">${tabLabel}</li>
       `;
  }
}
