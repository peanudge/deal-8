import AbstractPage from "../AbstractPage";

import chevronLeftSVG from "@/public/svg/chevron-left.svg";
import checkSVG from "@/public/svg/check.svg";
import imageSVG from "@/public/svg/image.svg";
import closeSVG from "@/public/svg/close-white.svg";
import mapPinSVG from "@/public/svg/map-pin.svg";

import "@/public/css/createPost.css";
import ImageUploadView from "./views/ImageUploadView";
import Controller from "./Controller";
import Store from "./Store";

export default class CreatePostPage extends AbstractPage {
  constructor(params) {
    super(params);
    this.setTitle("Create Post");
  }

  async render() {
    return /* html */ `
    <header class="header">
      <a class="header--left" href="/main" data-link>
       ${chevronLeftSVG}
      </a>
      <h1 class="header--center">
        <span class="header--center--title"> 글쓰기 </span>
      </h1>
      <div class="header--right">
        <div id="create-btn" class="check-icon">
           ${checkSVG}
        </div>  
      </div>
    </header>
    <main class="posting-main">
        <div id="img-register" class="posting-main-img-container">
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
            class="posting-main--text-input"
            type="text"
            placeholder="글 제목"
        />

        <input
            class="posting-main--text-input subtext"
            type="text"
            placeholder="(필수) 카테고리를 선택해주세요."
        />

        <div class="posting-main-tag-container">
            <span class="tag"
            >여성 패션/합화
            <span class="close-btn">
                <div class="close-icon">${closeSVG} </div>
            </span>
            </span>
            <span class="tag">Test 
                <span class="close-btn">
                    <div class="close-icon">${closeSVG} </div>
                </span>
            </span>
            <span class="tag">Test 
                <span class="close-btn">
                    <div class="close-icon">${closeSVG} </div>
                </span>
            </span>
        </div>

        <span class="split-line"></span>

        <input
            class="posting-main--text-input"
            type="number"
            placeholder="가격 (선택사항)"
        />
        <span class="split-line"></span>

        <span
            class="posting-main--textarea expand-textarea"
            role="textbox"
            contenteditable
        ></span>
    </main>
   
    <div class="posting-location">
        <div class="posting-location--icon">
            ${mapPinSVG}
        </div>
        <div class="posting-location--name">상암동</div>
    </div>
    `;
  }
  async after_render() {
    const store = new Store();
    const views = {
      imageUploadView: new ImageUploadView(),
    };

    new Controller(store, views);
  }
}
