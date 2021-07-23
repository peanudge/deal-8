import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
const tag = "[BasicHeaderView]";

export default class SignupFormView extends View {
  constructor(element = qs("#signup-form")) {
    super(element);

    this.idInputElement = qs("#id-input", this.element);
    this.idErrorMessageElement = qs("#id-error-message", this.element);
    this.locationInputElement = qs("#location-input", this.element);
    this.locationErrorMessageElement = qs(
      "#location-error-message",
      this.element
    );
    this.submitButtonElement = qs("#signup-btn", this.element);
    this.bindingEvents();
  }

  bindingEvents() {
    on(this.submitButtonElement, "click", () => this.handleSignupButtonClick());
  }

  handleSignupButtonClick() {
    const id = this.idInputElement.value;
    const location = this.locationInputElement.value;
    this.emit("@signup", {
      value: {
        id,
        location,
      },
    });
  }

  show(error = {}) {
    if (error["username"]) {
      this.idErrorMessageElement.innerText = error["username"];
    } else {
      this.idErrorMessageElement.innerText = "";
    }
    if (error["location"]) {
      this.locationErrorMessageElement.innerText = error["location"];
    } else {
      this.locationErrorMessageElement.innerText = "";
    }
    super.show();
  }
}
