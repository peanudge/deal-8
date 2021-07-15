import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
const tag = "[BasicHeaderView]";

export default class SignupFormView extends View {
  constructor(element = qs("#signup-form")) {
    console.log(tag, "constructor");
    super(element);

    this.idInputElement = qs("#id-input", this.element);
    this.locationInputElement = qs("#location-input", this.element);
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

  show() {
    super.show();
  }
}
