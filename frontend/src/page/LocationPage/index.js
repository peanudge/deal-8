import AbstractPage from "../AbstractPage";
import Controller from "./Controller";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";
import closeSVG from "@/public/svg/close-white.svg";

import "@/public/css/location.css";
import LocationListView from "./views/LocationListView";
import AddLocationModalView from "./views/AddLocationModalView";
import DeleteLocationModalView from "./views/DeleteLocationModalView";
import Store from "./Store";

const tag = "[LocationPage]";

export default class LocationPage extends AbstractPage {
  constructor(params) {
    console.log(tag, "contructor");
    super(params);
  }

  async render() {
    return /*html*/ `
    <header class="header">
      <a class="header--left" href="./main" data-link>
        ${chevronLeftSVG}
      </a>
      <h1 class="header--center">
        <span class="header--center--title"> 내 동네 설정하기 </span>
      </h1>
    </header>
    <main class="location-main">
      <div class="location-main--comment">
        <p>
          지역은 최소 1개 이상<br />
          최대 2개까지 설정 가능해요
        </p>
      </div>
      <div id="location-container" class="location--container">
      </div>
    </main>
    <div id="location-edit-modal" class="edit-modal">
      <p>우리 동네를 입력하세요</p>
      <input
        id="edit-location-input"
        class="edit-modal--text-input"
        type="text"
        placeholder="시 구 제외, 동만 입력"
      />
      <div class="edit-modal--btn-container">
        <div id="cancel-btn" class="edit-modal--btn-container--cancel-btn">
          취소
        </div>
        <div id="accept-btn" class="edit-modal--btn-container--accept-btn">
          확인
        </div>
      </div>
    </div>
    <div id="location-delete-modal" class="delete-modal">
        <p>정말 <span id="location-name"></span> 동네를 삭제하시겠습니까?</p>
        <div class="edit-modal--btn-container">
            <div id="cancel-btn" class="edit-modal--btn-container--cancel-btn">
            취소
            </div>
            <div id="accept-btn" class="edit-modal--btn-container--accept-btn">
            삭제
            </div>
        </div>
    </div>
    `;
  }

  async after_render() {
    const store = new Store();
    const views = {
      deleteLocationModalView: new DeleteLocationModalView(),
      addLocationModalView: new AddLocationModalView(),
      locationListView: new LocationListView(),
    };
    new Controller(store, views);
  }
}
