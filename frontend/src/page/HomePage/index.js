import AbstractPage from "../AbstractPage";
import Controller from "./Controller";
import MainHeaderView from "./views/MainHeaderView";
import ProductListView from "./views/ProductListView";

import "@/public/css/main.css";

import exampleCooler from "@/public/image/example-cooler.svg";
import interestIcon from "@/public/svg/interest.svg";
import chatIcon from "@/public/svg/chat.svg";
import interestSmallIcon from "@/public/svg/interest-small.svg";
import plusIcon from "@/public/svg/plus.svg";

const tag = "[HomePage]";

export default class HomePage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async render() {
    return `
    <div id="main-header" class="main-header"></div>
    <div id="product-list-container" class="content"></div>
    <article class="new-product-button">
      <a href="./createPost.html">
        <div class="plus-icon">${plusIcon}</div>
      </a>
    </article>
    `;
  }

  async after_render() {
    const views = {
      mainHeaderView: new MainHeaderView(),
      productListView: new ProductListView(),
    };
    new Controller(views);
  }
}
