import View from "@/page/View";

export default class ModalView extends View {
  constructor(element) {
    super(element);
  }

  show() {
    this.element.style.visibility = "visible";
    super.show();
  }

  hide() {
    this.element.style.visibility = "hidden";
    super.hide();
  }
}
