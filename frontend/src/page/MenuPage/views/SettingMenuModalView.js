import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";
import ModalView from "@/common/views/ModalView";

export default class SettingMenuModalView extends ModalView {
  constructor(element = qs("#setting-menu-modal")) {
    super(element);
    this.editButtonElement = qs("#setting-edit-btn", this.element);
    this.deleteButtomElement = qs("#setting-delete-btn", this.element);
    this.cancelButtonElement = qs(".action-modal--cancel", this.element);
    this.bindingEvents();
  }

  bindingEvents() {
    on(this.editButtonElement, "click", () => {
      this.emit("@edit");
    });

    on(this.deleteButtomElement, "click", () => {
      this.emit("@delete");
    });

    on(this.cancelButtonElement, "click", () => {
      this.emit("@cancel");
    });
  }
}
