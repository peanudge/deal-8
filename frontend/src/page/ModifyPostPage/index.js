import AbstractPage from "../AbstractPage";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";
import checkSVG from "@/public/svg/check.svg";
import imageSVG from "@/public/svg/image.svg";
import mapPinSVG from "@/public/svg/map-pin.svg";
import chevronRightSVG from "@/public/svg/chevron-right.svg";

import ImageUploadView from "./views/ImageUploadView";
import Controller from "./Controller";
import Store from "./Store";
import ModifyPostFormView from "./views/ModifyPostFormView";
import ModifyPostHeaderView from "./views/CategorySelectView";

import "@/public/css/writePost.css";
import CategorySelectView from "./views/CategorySelectView";

export default class ModifiyPostPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Modify Post");
  }

  async render() {
    return /* html */ `
    <header id="posting-header" class="header">
      <a class="header--left" href="/main" data-link>
       ${chevronLeftSVG}
      </a>
      <h1 class="header--center">
        <span class="header--center--title"> 수정하기 </span>
      </h1>
      <div class="header--right">
        <div id="Modify-btn" class="check-icon">
           ${checkSVG}
        </div>  
      </div>
    </header>
    <main id="posting-container" class="posting-main">
        <div id="img-register-container" class="posting-main-img-container">
            <label for="img-input" class="img-register">
                <div class="image-icon">${imageSVG}</div>  
                <p class="img-register--msg">
                    <span id="image-count">0</span>/ 10
                </p>
            </label>
            <input id="img-input" type="file" multiple/>
            <div id="img-container" class="img-container"></div>
        </div>
        <span class="split-line"></span>
          <input
              id="title-input"
              class="posting-main--text-input"
              type="text"
              placeholder="글 제목"
          />
        <span class="split-line"></span>
        <div id="category-btn" 
            class="posting-main--category-btn">
              <p class="category-name">(필수) 카테고리를 선택해주세요.<p>
              <div class="right-arrow-icon">${chevronRightSVG}</div>
          </div>
        <span class="split-line"></span>
        <input
            id="cost-input"
            class="posting-main--text-input"
            type="number"
            min="1"
            step="any"
            placeholder="가격 (선택사항)"
        />
        <span class="split-line"></span>
        <div class="posting-location">
          <div class="posting-location--icon">
              ${mapPinSVG}
          </div>
          <div id="location-name" class="posting-location--name">
            (자동) 현재 계정 동네
          </div>
        </div>
        <span class="split-line"></span>
        <span
            id="content-textarea"
            class="posting-main--textarea expand-textarea"
            role="textbox"
            contenteditable
        ></span>
    </main>
    <div id="category-select-view" class="category-list-container"></div>
    `;
  }
  async after_render() {
    const store = new Store();
    const views = {
      modifyPostHeaderView: new ModifyPostHeaderView(),
      imageUploadView: new ImageUploadView(),
      modifyPostFormView: new ModifyPostFormView(),
      categorySelectView: new CategorySelectView(),
    };

    new Controller(store, views);
  }
}
