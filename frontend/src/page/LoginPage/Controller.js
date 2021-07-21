import { loginAsync } from "@/api/auth";
import { getProfileAsync } from "@/api/user";
import { navigateTo } from "@/router";

const ERROR_USERNAME_INVALID = "존재하지않는 사용자입니다.";

const tag = "[Login Controller]";
export default class Controller {
  constructor({ loginFormView }) {
    this.loginFormView = loginFormView;

    this.init();
    this.error = {};
    this.subscribeViewEvents();
  }

  init() {
    getProfileAsync().then(({ isAuth }) => {
      if (isAuth) {
        navigateTo("/profile");
      }
    });
  }

  subscribeViewEvents() {
    this.loginFormView.on("@login", (event) => this.login(event.detail.value));
  }

  login(id) {
    loginAsync({ id }).then((result) => {
      if (result.success) {
        navigateTo("/");
      } else {
        this.error = { username: ERROR_USERNAME_INVALID };
        this.render();
      }
    });
  }

  render() {
    this.loginFormView.show(this.error);
  }
}
