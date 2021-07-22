import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";

export default class AddLocationModalView extends View {
  constructor(element = qs("#location-edit-modal")) {
    super(element);
    this.cancelBtnElement = qs("#cancel-btn", this.element);
    this.acceptBtnElement = qs("#accept-btn", this.element);
    this.locationInputElement = qs("#edit-location-input", this.element);
    this.blurBgElement = qs("#modal-blur-bg");
    this.eventsBinding();
  }

  eventsBinding() {
    on(this.cancelBtnElement, "click", (e) =>
      this.handleCancelButtonClickEvent()
    );
    on(this.acceptBtnElement, "click", (e) =>
      this.handleAcceptButtonClickEvent()
    );
    on(this.locationInputElement, "keydown", (e) => {
      if (e.keyCode == 13) {
        this.handleAcceptButtonClickEvent();
      }
    });
  }

  handleCancelButtonClickEvent() {
    this.emit("@close-add-modal");
  }

  handleAcceptButtonClickEvent() {
    const location = this.locationInputElement.value;
    this.emit("@add-location", { value: location });
  }

  show() {
    this.blurBgElement.style.visibility = "visible";
    super.show();
  }

  hide() {
    this.blurBgElement.style.visibility = "hidden";
    super.hide();
  }
}
