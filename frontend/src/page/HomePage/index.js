import AbstractPage from "../AbstractPage";
import Controller from "./Controller";
import MainHeaderView from "./views/MainHeaderView";

import "@/public/css/main.css";

const tag = "[HomePage]";

export default class HomePage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async render() {
    return `
    <div id="main-header" class="main-header"></div>
    `;
  }

  async after_render() {
    const views = {
      mainHeaderView: new MainHeaderView(),
    };
    new Controller(views);
  }
}
