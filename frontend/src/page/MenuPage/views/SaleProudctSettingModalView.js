import { qs } from "@/helper/selectHelpers";
import View from "@/page/View";

export default class SaleProductSettingModalView extends View {
  constructor(element = qs("#setting-menu-modal")) {
    super(element);
  }
}
