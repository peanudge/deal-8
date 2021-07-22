import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import View from "@/page/View";

export default class DeleteLocationModalView extends View {
  constructor(element = qs("#location-delete-modal")) {
    super(element);

    this.locationNameElement = qs("#location-name", this.element);
    this.cancelBtnElement = qs("#cancel-btn", this.element);
    this.acceptBtnElement = qs("#accept-btn", this.element);
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
  }

  handleCancelButtonClickEvent() {
    this.emit("@close-delete-modal");
  }

  handleAcceptButtonClickEvent() {
    this.emit("@delete-location");
  }

  show(location) {
    this.blurBgElement.style.visibility = "visible";
    this.locationNameElement.innerText = '"' + location + '"';
    super.show();
  }

  hide() {
    this.blurBgElement.style.visibility = "hidden";
    super.hide();
  }
}
