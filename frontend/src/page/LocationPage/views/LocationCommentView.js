import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";

export default class LocationCommentView extends View {
  constructor(element = qs("#location-comment-container")) {
    super(element);
    this.errorMessageElement = qs(".error-message", this.element);
    this.eventsBinding();
  }

  eventsBinding() {}

  show(error = {}) {
    if (error["location"] && error["location"] !== "") {
      this.errorMessageElement.innerText = error["location"];
    }
    super.show();
  }
}
