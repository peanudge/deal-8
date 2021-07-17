const tag = "[Controller]";

export default class Controller {
  constructor(store, { imageUploadView }) {
    this.store = store;
    this.imageUploadView = imageUploadView;
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.imageUploadView.on("@image-upload", (e) => {
      this.uploadImagesFromFileSystem(e.detail.value);
    });
  }

  uploadImagesFromFileSystem(files) {
    const countOfImage = Object.keys(files).length;

    if (countOfImage > 5) {
      alert("상품 Image는 10개까지만 올릴 수 있습니다.");
    } else {
      this.store.images = files;
    }
    this.render();
  }

  render() {
    const { images } = this.store;
    this.imageUploadView.show(images);
  }
}
