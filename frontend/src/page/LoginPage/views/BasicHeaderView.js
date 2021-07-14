import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";

const tag = "[BasicHeaderView]";

export default class BasicHeaderView extends View {
  constructor(element = qs(".header")) {
    console.log(tag, "constructor");
    super(element);
  }

  show() {
    super.show();
  }
}
