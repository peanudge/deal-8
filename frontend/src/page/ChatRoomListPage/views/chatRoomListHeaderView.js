import View from "@/page/View";

export default class ChatRoomListHeaderView extends View {
  constructor(element = qs(".header"), template = new Template()) {
    super(element);
    this.template = template;
    this.bindingEvents();
  }

  show() {
    this.element.innerHTML = this.template.getContent;
  }
}

class Template {
  getContent() {
    return `
    <a class="header--left" href="./detailPost.html">
        <img src="./icon/chevron-left.svg" />
    </a>
    <h1 class="header--center">
        <span class="header--center--title"> 채팅하기 </span>
    </h1>
    `;
  }
}
