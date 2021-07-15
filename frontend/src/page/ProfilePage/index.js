import AbstractPage from "../AbstractPage";
import ProfileView from "./views/ProfileView";

import Controller from "./Controller";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";

import "@/public/css/profile.css";

const tag = "[ProfilePage]";

export default class ProfilePage extends AbstractPage {
  constructor(params) {
    console.log(tag, "contructor");
    super(params);
  }

  async render() {
    return ` <header class="header">
                <a class="header--left" href="/login" data-link>
                <div class="back-icon">${chevronLeftSVG}</div>
                </a>
                <h1 class="header--center">
                <span class="header--center--title"> 내 계정 </span>
                </h1>
            </header>
            <main id="profile-view" class="profile-main">
                <h1  id="username-label" class="profile-main--username">Username</h1>
                <div id="logout-btn" class="profile-main--logout-btn">로그아웃</div>
            </main>`;
  }

  async after_render() {
    const views = {
      profileView: new ProfileView(),
    };
    new Controller(views);
  }
}
