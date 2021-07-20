import AbstractPage from "../AbstractPage";

export default class ChatRoomListPage extends AbstractPage {
  constructor(params) {
    super(params);
  }
  async render() {
    return /*html*/ `
      <header class="header">
        <a class="header--left" href="./detailPost.html">
          <img src="./icon/chevron-left.svg" />
        </a>
        <h1 class="header--center">
          <span class="header--center--title"> 채팅하기 </span>
        </h1>
      </header>
  <div class="content">
    <article class="content--chat-item unread">
      <div class="content--chat-item--left">
        <strong class="username">UserC</strong>
        <span class="current-message">혹시 팔렸나요?</span>
      </div>
      <div class="content--chat-item--right">
        <div class="content--chat-item--right--left">
          <div><span class="current-chat-time">15분전</span></div>
          <div><div class="un-read-count">1</div></div>
        </div>
        <a class="content--chat-item--right--right">
          <img src="/image/example-cooler.svg" alt="상품 썸네일 사진" />
        </a>
      </div>
    </article>
    <article class="content--chat-item unread">
      <div class="content--chat-item--left">
        <strong class="username">UserC</strong>
        <span class="current-message">혹시 팔렸나요?</span>
      </div>
      <div class="content--chat-item--right">
        <div class="content--chat-item--right--left">
          <div><span class="current-chat-time">15분전</span></div>
          <div><div class="un-read-count">1</div></div>
        </div>
        <a class="content--chat-item--right--right">
          <img src="/image/example-cooler.svg" alt="상품 썸네일 사진" />
        </a>
      </div>
    </article>
    <article class="content--chat-item">
      <div class="content--chat-item--left">
        <strong class="username">UserC</strong>
        <span class="current-message">혹시 팔렸나요?</span>
      </div>
      <div class="content--chat-item--right">
        <div class="content--chat-item--right--left">
          <div><span class="current-chat-time">15분전</span></div>
          <div></div>
        </div>
        <a class="content--chat-item--right--right">
          <img src="/image/example-cooler.svg" alt="상품 썸네일 사진" />
        </a>
      </div>
    </article>
  </div>  
    `;
  }
}
