import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { delegate, on } from "@/helper/eventHelpers";

import closeSVG from "@/public/svg/close-white.svg";

export default class ImageUploadView extends View {
  constructor(
    element = qs("#img-register-container"),
    template = new Template()
  ) {
    super(element);
    this.imgInputElement = qs("#img-input", this.element);
    this.imgCountLabelElement = qs("#image-count", this.element);
    this.imgContainerElement = qs("#img-container", this.element);
    this.template = template;
    this.bindingEvent();
  }

  bindingEvent() {
    on(this.imgInputElement, "change", (e) => this.handleImageUploadEvent(e));
    delegate(this.element, "click", ".img-box--delete-btn", (e) => {
      const { key } = e.target.dataset;
      this.handleTempImageDeleteClickEvent(key);
    });
  }

  handleTempImageDeleteClickEvent(imageKey) {
    this.emit("@image-delete", { value: imageKey });
  }

  handleImageUploadEvent(e) {
    const files = this.imgInputElement.files;
    this.emit("@image-upload", {
      value: files,
    });
  }

  renderImagesAsync(files) {
    const imageFiles = Object.keys(files).map((i) => {
      try {
        const file = files[i];
        const url = URL.createObjectURL(file);
        return { key: i, url };
      } catch (err) {
        return {};
      }
    });

    this.imgContainerElement.innerHTML = this.template.getImageList(imageFiles);
  }

  show(images) {
    const countOfImage = Object.keys(images).length;
    this.renderImagesAsync(images);

    this.imgCountLabelElement.innerText = countOfImage;
    super.show();
  }
}

class Template {
  getImageList(imageFiles = []) {
    return imageFiles.map((imageFile) => this._getImage(imageFile)).join("");
  }
  _getImage(imageFile) {
    const { key, url } = imageFile;
    return /* html */ `
    <div class="img-box">
      <img class="img-box--img" src="${url}"/>
      <div class="img-box--delete-btn" data-key=${key}>
        ${closeSVG}
      </div>
    </div>`;
  }
}
