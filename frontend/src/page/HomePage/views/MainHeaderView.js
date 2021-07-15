import View from "@/page/View";
import { delegate } from "@/helper/eventHelpers";

import { qs } from "@/helper/selectHelpers";

import categorySVG from "@/public/svg/category-white.svg";
import gpsSVG from "@/public/svg/gps-white.svg";
import profileSVG from "@/public/svg/profile-white.svg";
import menuSVG from "@/public/svg/menu-white.svg";

const tag = "[MainHeaderView]";

export default class MainHeaderView extends View {
  constructor(element = qs("#main-header"), template = new Template()) {
    console.log(tag, "constructor");
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#category-btn", (e) => {
      this.showCategoryView();
    });
    delegate(this.element, "click", "#location", (e) => {
      this.handleLocationClick();
    });
  }

  handleLocationClick() {
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

  show(user = {}) {
    const { locations } = user;
    this.element.innerHTML = this.template.getHeader(locations);
    super.show();
  }
}

class Template {
  getLocationElements(locations) {
    const results = locations.map(
      (location) => `<div class="dropdown-item">${location}</div>`
    );
    return results.join("");
  }
  getHeader(locations) {
    let currentLocation;
    let locationElements = "";
    if (!locations || location?.length === 0) {
      currentLocation = "";
    } else {
      currentLocation = locations[0];
      locationElements = this.getLocationElements(locations);
    }
    return `
    <div class="main-header--left" href="/category.html">
      <div id="category-btn" class="category-icon">
          ${categorySVG} 
      </div>
    </div>
    <div class="main-header--center">
      <div class="location dropdown-wrapper" id="location">
        <div class="location-icon">${gpsSVG}</div>
        <strong> ${currentLocation} </strong>
        
      </div>
      <div class="dropdown" id="location-menu">
        ${locationElements}
        <div class="dropdown-item">
          <a href="/location" data-link>내 동내 설정하기</a>
        </div>
      </div>
    </div>
    <div class="main-header--right">
      <a href="/login" data-link>
        <div class="profile-icon">${profileSVG}</div>  
      </a>
      <a href="/menu" data-link>
        <div class="menu-icon">${menuSVG}</div>  
      </a>
    </div>
        `;
  }
}
