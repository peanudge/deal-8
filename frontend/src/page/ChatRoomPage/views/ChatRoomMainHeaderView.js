import View from "@/page/View";
import { ProductStatusMap } from "@/util/productStatus";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

export default class ChatRoomMainHeaderView extends View {
  constructor(element = qs(".chat-main--header"), template = new Template()) {
    super(element);
    this.template = template;
  }

  show(product = {}) {
    const { thumbnail, title, cost, status } = product;
    this.element.innerHTML = this.template.getHeader({
      thumbnail,
      title,
      cost,
      status,
    });
  }
}

class Template {
  getHeader({ thumbnail, title, cost, status }) {
    return `
        <img class="chat-main--header--img" src="${thumbnail}" />
        <div class="chat-main--header--content">
            <p>${title}</p>
            <p>${cost}원</p>
        </div>
        <div class="chat-main--header--status">${ProductStatusMap[status]}</div>
    `;
  }
}
