import { logoutAsync } from "@/api/auth";
import { getProfileAsync } from "@/api/user";
import { navigateTo } from "@/router";

const tag = "[Login Controller]";
export default class Controller {
  constructor({ profileView }) {
    console.log(tag);
    this.profileView = profileView;

    this.subscribeViewEvents();
    this.init();
    this.render();
  }

  init() {
    // Get Username from server
    getProfileAsync().then((data) => {
      const { username } = data;
      this.render(username);
    });
  }

  subscribeViewEvents() {
    this.profileView.on("@logout", (event) => this.logout());
  }

  logout() {
    // TODO: start spinner
    logoutAsync(() => {
      navigateTo("/login");
    });
  }

  render(username = "") {
    this.profileView.show(username);
  }
}
