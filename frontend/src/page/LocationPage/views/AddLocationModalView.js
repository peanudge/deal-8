import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";

export default class AddLocationModalView extends View {
  constructor(element = qs("#location-edit-modal")) {
    super(element);
    this.cancelBtnElement = qs("#cancel-btn", this.element);
    this.acceptBtnElement = qs("#accept-btn", this.element);
    this.locationInputElement = qs("#edit-location-input", this.element);

    this.eventsBinding();
  }

  eventsBinding() {
    on(this.cancelBtnElement, "click", (e) =>
      this.handleCancelButtonClickEvent()
    );
    on(this.acceptBtnElement, "click", (e) =>
      this.handleAcceptButtonClickEvent()
    );
  }

  handleCancelButtonClickEvent() {
    this.emit("@close-add-modal");
  }

  handleAcceptButtonClickEvent() {
    const location = this.locationInputElement.value;
    this.emit("@add-location", { value: location });
  }

  show() {
    super.show();
  }
}
