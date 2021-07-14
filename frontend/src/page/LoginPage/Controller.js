import { loginAsync } from "@/api/auth";
import { navigateTo } from "@/router";

const tag = "[Login Controller]";
export default class Controller {
  constructor({ headerView, loginFormView }) {
    console.log(tag);
    this.headerView = headerView;
    this.loginFormView = loginFormView;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.loginFormView.on("@login", (event) => this.login(event.detail.value));
  }

  login(id) {
    loginAsync({ id }, () => {
      navigateTo("/");
    });
  }

  render() {
    // render
  }
}
