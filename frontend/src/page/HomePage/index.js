import AbstractPage from "../AbstractPage";
import Controller from "./Controller";
import MainHeaderView from "./views/MainHeaderView";
import DropDownMenuView from "@/common/views/DropDownMenuView";

import ProductListView from "@/common/views/ProductListView";

import "@/public/css/common/drop_down.css";
import "@/public/css/category.css";
import "@/public/css/main.css";

import plusSVG from "@/public/svg/plus.svg";
import categorySVG from "@/public/svg/category-white.svg";
import profileSVG from "@/public/svg/profile-white.svg";
import menuSVG from "@/public/svg/menu-white.svg";

import CategoryView from "./views/CategoryView";
import Store from "./Store";

import { qs } from "@/helper/selectHelpers";

export default class HomePage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async render() {
    return /*html*/ `
    <div id="main-header" class="main-header">
      <div class="main-header--left">
        <div id="category-btn" class="category-icon">
            ${categorySVG} 
        </div>
      </div>
      <div class="main-header--center">
        <div id="location-dropdown">
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
    </div>

    <div id="product-container" class="product-container"></div>

    <article class="new-product-button">
      <a href="/createPost" data-link>
       <div class="plus-icon">${plusSVG}</div>
      </a>
    </article>

    <div id="category" class="category-container"></div>
    `;
  }

  async after_render() {
    const store = new Store();
    const views = {
      mainHeaderView: new MainHeaderView(),
      productListView: new ProductListView(qs("#product-container")),
      categoryView: new CategoryView(),
      locationDropDownView: new DropDownMenuView(qs("#location-dropdown")),
    };

    new Controller(store, views);
  }
}
