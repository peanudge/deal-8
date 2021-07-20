import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
const tag = "[ProfileView]";

export default class ProfileView extends View {
  constructor(element = qs("#profile-view")) {
    super(element);

    this.usernameLabelElement = qs("#username-label", this.element);
    this.logoutButtonElement = qs("#logout-btn", this.element);

    this.bindingEvents();
  }

  bindingEvents() {
    on(this.logoutButtonElement, "click", () => {
      this.emit("@logout");
    });
  }

  setUsername(name) {
    this.usernameLabelElement.innerText = name;
  }

  show(username) {
    super.show();
    this.setUsername(username);
  }
}
