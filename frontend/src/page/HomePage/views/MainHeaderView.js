import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";

import categorySVG from "@/public/svg/category-white.svg";
import gpsSVG from "@/public/svg/gps-white.svg";
import profileSVG from "@/public/svg/profile-white.svg";
import menuSVG from "@/public/svg/menu-white.svg";

const tag = "[MainHeader]";

export default class MainHeaderView extends View {
  constructor(element = qs("#main-header"), template = new Template()) {
    console.log(tag, "constructor");
    super(element);
    this.template = template;
    this.bindEvents();
  }

  bindEvents() {
    // TODO: click event
  }

  show(data = []) {
    this.element.innerHTML = this.template.getHeader();
    super.show();
  }
}

class Template {
  getHeader() {
    return `
    <div class="main-header--left" href="/category.html">
      <div class="svg-container">${categorySVG}</div>  
    </div>
    <div class="main-header--center">
      <div class="location">
        <div class="svg-container location--icon">${gpsSVG}</div>
        <strong> 역삼동 </strong>
      </div>
    </div>
    <div class="main-header--right">
      <a class="svg-container" href="/login" data-link>
        ${profileSVG}
      </a>
      <a class="svg-container" href="/menu" data-link>
      ${menuSVG}
      </a>
    </div>
        `;
  }
}
