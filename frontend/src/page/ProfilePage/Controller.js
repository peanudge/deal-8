import { logoutAsync } from "@/api/auth";
import { getProfileAsync } from "@/api/user";
import { navigateTo } from "@/router";

const tag = "[Login Controller]";
export default class Controller {
  constructor({ profileView }) {
    this.profileView = profileView;

    this.subscribeViewEvents();
    this.init();
    this.render();
  }

  init() {
    // Get Username from server
    getProfileAsync().then(({ isAuth, account }) => {
      if (!isAuth) {
        navigateTo("/login");
      } else {
        this.render(account.username);
      }
    });
  }

  subscribeViewEvents() {
    this.profileView.on("@logout", (event) => this.logout());
  }

  logout() {
    // TODO: start spinner
    logoutAsync().then((result) => {
      if (result.success) {
        navigateTo("/");
      }
    });
  }

  render(username = "") {
    this.profileView.show(username);
  }
}
