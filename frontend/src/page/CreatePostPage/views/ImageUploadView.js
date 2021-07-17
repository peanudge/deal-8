import View from "@/page/View";
import { qs } from "@/helper/selectHelpers";
import { on } from "@/helper/eventHelpers";

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
  }

  handleImageUploadEvent(e) {
    const files = this.imgInputElement.files;
    this.emit("@image-upload", {
      value: files,
    });
  }

  renderImagesAsync(files) {
    const imagePaths = Object.keys(files).map((i) => {
      const file = files[i];
      const url = URL.createObjectURL(file);
      return url;
    });

    this.imgContainerElement.innerHTML = this.template.getImageList(imagePaths);
  }

  show(images) {
    const countOfImage = Object.keys(images).length;
    if (countOfImage > 0) {
      this.renderImagesAsync(images);
    }
    this.imgCountLabelElement.innerText = countOfImage;
    super.show();
  }
}

class Template {
  getImageList(images) {
    return images.map((image) => this._getImage(image)).join("");
  }
  _getImage(image) {
    return /* html */ `
    <div class="img-box" >
      <img src="${image}"/>
    </div>`;
  }
}
