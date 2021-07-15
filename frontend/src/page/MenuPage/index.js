import AbstractPage from '../AbstractPage';
import Controller from './Controller';
import '@/public/css/menu.css';
import '@/public/css/login.css';

import chevronLeftSVG from '@/public/svg/chevron-left.svg';

const tag = '[MenuPage]';

export default class MenuPage extends AbstractPage {
  constructor(params) {
    console.log(tag, 'contructor');
    super(params);
  }

  async render() {
    return `
        <header class="header">
            <a class="header--left" href="/main">
                <div class="back-icon">${chevronLeftSVG}</div>
            </a>
            <h1 class="header--center">
                <span class="header--center--title"> 메뉴 </span>
            </h1>
        </header>
        <div class="tab-bar">
            <section id="productList">
                <a href="?tab=productList">판매목록</a>
            </section>
            <section id="chatting"><a href="?tab=chatting">채팅</a></section>
            <section id="interestList">
                <a href="?tab=interestList">관심목록</a>
            </section>
        </div>
        <div class="slide-wrapper">
        <div class="section-wrapper">
            <section id="product-list-window">
            <div class="content">
            </div>
            </section>
            <section id="chat-list-window">
            <div class="content">
            
            </div>
            </section>
            <section id="interest-list-window">
            <div class="content">
            
            </div>
            </section>
        </div>
        </div>

    `;
  }

  async after_render() {
    const views = {};
    new Controller(views);
  }
}
