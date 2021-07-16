import AbstractPage from "../AbstractPage";
import Controller from "./Controller";
import MainHeaderView from "./views/MainHeaderView";
import ProductListView from "@/common/views/ProductListView";

import "@/public/css/category.css";
import "@/public/css/common/drop_down.css";
import "@/public/css/main.css";

import plusIcon from "@/public/svg/plus.svg";
import CategoryView from "./views/CategoryView";
import Store from "./Store";

const tag = "[HomePage]";

export default class HomePage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async render() {
    return /*html*/ `
    <div id="main-header" class="main-header"></div>
    <div id="product-container" class="product-container"></div>

    <article class="new-product-button">
      <a href="/createPost">
       <div class="plus-icon">${plusIcon}</div>
      </a>
    </article>
    <div id="category" class="category-container"></div>
    `;
  }

  async after_render() {
    const store = new Store();
    const views = {
      mainHeaderView: new MainHeaderView(),
      productListView: new ProductListView(),
      categoryView: new CategoryView(),
    };

    new Controller(store, views);
  }
}
