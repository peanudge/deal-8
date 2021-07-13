import AbstractView from "../AbstractView";
import MainHeaderView from "./MainHeader";

export default class HomeView extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
    this.headerView = new MainHeaderView();
  }

  async render() {
    return `
        ${await this.headerView.render()}
    `;
  }

  async after_render() {}
}
