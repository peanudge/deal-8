import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate } from "@/helper/eventHelpers";

export default class ChatRoomAlertModalView extends View {
  constructor(element = qs("#alert-modal"), template = new Template()) {
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  bindingEvents() {
    delegate(this.element, "click", "#cancel-btn", () => {
      this.handleCancelClick();
    });

    delegate(this.element, "click", "#accept-btn", () => {
      this.handleAcceptClick();
    });
  }

  handleCancelClick() {
    this.element.style.visibility = "hidden";
  }

  handleAcceptClick() {
    this.emit("@exit-room");
  }

  show() {
    this.element.innerHTML = this.template.getContent();
  }
}

class Template {
  getContent() {
    return `
      <p>정말로이 채팅방을 나가시겠습니까?</p>
      <div class="alert-modal--btn-container">
          <div id="cancel-btn" class="alert-modal--btn-container--cancel-btn">
              취소
          </div>
          <div id="accept-btn" class="alert-modal--btn-container--accept-btn">
              나가기
          </div>
      </div>
      `;
  }
}
