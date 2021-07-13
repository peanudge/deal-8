import AbstractView from "@/views/AbstractView";
import categorySVG from "@/public/svg/category-white.svg";
import gpsSVG from "@/public/svg/gps-white.svg";
import profileSVG from "@/public/svg/profile-white.svg";
import menuSVG from "@/public/svg/menu-white.svg";

export default class MainHeader extends AbstractView {
  constructor(params) {
    super(params);
  }

  async render() {
    return `
    <div class="main-header">
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
  </div>
        `;
  }

  async after_render() {}
}
