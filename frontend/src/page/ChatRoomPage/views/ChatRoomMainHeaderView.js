import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

export default class ChatRoomMainHeaderView extends View {
  constructor(element = qs(".chat-main--header"), template = new Template()) {
    super(element);
    this.template = template;
  }

  show({ productThumbnail, productCost, productTitle }) {
    this.element.innerHTML = this.template.getHeader({
      productThumbnail,
      productTitle,
      productCost,
    });
  }
}

class Template {
  getHeader({ productThumbnail, productTitle, productCost }) {
    return `
        <img class="chat-main--header--img" src="${productThumbnail}" />
            <div class="chat-main--header--content">
                <p>${productTitle}</p>
                <p>${productCost}원</p>
            </div>
        <div class="chat-main--header--status">판매중</div>
    `;
  }
}
