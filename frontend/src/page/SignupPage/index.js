import AbstractPage from "../AbstractPage";
import Controller from "./Controller";
import chevronLeftSVG from "@/public/svg/chevron-left.svg";

import "@/public/css/signup.css";
import SignupFormView from "./views/SignupFormView";

const tag = "[LoginPage]";

export default class LoginPage extends AbstractPage {
  constructor(params) {
    console.log(tag, "contructor");
    super(params);
  }

  async render() {
    return /*html*/ `
    <header class="header">
      <a class="header--left" href="/login" data-link>
      <div class="back-icon">${chevronLeftSVG}</div>
      </a>
      <h1 class="header--center">
        <span class="header--center--title"> 회원가입 </span>
      </h1>
    </header>
    <main id="signup-form" class="signup-main">
      <label for="id-input" class="signup-main--label">아이디</label>
      <input
        id="id-input"
        class="signup-main--text-input"
        type="text"
        placeholder="문자, 숫자 조합 20자 이상"
      />
      <label for="location-input" class="signup-main--label">우리 동네</label>
      <input
        id="location-input"
        class="signup-main--text-input"
        type="text"
        placeholder="시-구 제외, 동만 입력"
      />
      <div id="signup-btn" class="signup-main--submit-btn">회원가입</div>
    </main>
    `;
  }

  async after_render() {
    const views = {
      signupFormView: new SignupFormView(),
    };
    new Controller(views);
  }
}
