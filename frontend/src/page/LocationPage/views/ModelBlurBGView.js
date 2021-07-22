import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
export default class ModalBlurBGView extends View {
  constructor(element = qs("#modal-blur-bg")) {
    super(element);
  }
}
