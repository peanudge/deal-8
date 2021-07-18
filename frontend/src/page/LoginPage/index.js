import AbstractPage from "../AbstractPage";
import Controller from "./Controller";
import LoginFormView from "./views/LoginFormView";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";

import "@/public/css/login.css";

const tag = "[LoginPage]";

export default class LoginPage extends AbstractPage {
  constructor(params) {
    console.log(tag, "contructor");
    super(params);
  }

  async render() {
    return /*html*/ `
    <header id="header" class="header">
      <a class="header--left" href="/" data-link>
        <div class="back-icon">${chevronLeftSVG}</div>
      </a>
      <h1 class="header--center">
        <span class="header--center--title"> 로그인 </span>
      </h1>
    </header>
    <main id="login-form" class="login-main">
      <input
        id="id-input"
        class="login-main--text-input"
        type="text"
        placeholder="아이디를 입력하세요"
      />
      <div id="username-error-msg" class="error-message"></div>
      <div id="login-btn" class="login-main--submit-btn">로그인</div>
      <a class="login-main--link" href="/signup" data-link>회원가입</a>
    </main>
    `;
  }

  async after_render() {
    const views = {
      loginFormView: new LoginFormView(),
    };
    new Controller(views);
  }
}
