const tag = "[Controller]";

export default class Controller {
  constructor(
    store,
    {
      imageUploadView,
      createPostFormView,
      createPostHeaderView,
      categorySelectView,
    }
  ) {
    this.store = store;
    this.createPostHeaderView = createPostHeaderView;
    this.createPostFormView = createPostFormView;
    this.imageUploadView = imageUploadView;
    this.categorySelectView = categorySelectView;

    this.isShowCategorySelectView = false;

    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.categorySelectView.on("@back", () => {
      this.isShowCategorySelectView = false;
      this.render();
    });

    this.createPostFormView.on("@show-select-category", () => {
      this.isShowCategorySelectView = true;
      this.render();
    });

    this.imageUploadView.on("@image-upload", (e) => {
      this.uploadImagesFromFileSystem(e.detail.value);
    });
  }

  uploadImagesFromFileSystem(files) {
    const countOfImage = Object.keys(files).length;

    if (countOfImage > 10) {
      alert("상품 Image는 10개까지만 올릴 수 있습니다.");
    } else {
      this.store.images = files;
    }
    this.render();
  }

  render() {
    const { images } = this.store;

    if (this.isShowCategorySelectView) {
      this.categorySelectView.show();
      this.createPostFormView.hide();
      this.createPostHeaderView.hide();
    } else {
      this.categorySelectView.hide();
      this.createPostFormView.show();
      this.createPostHeaderView.show();
      this.imageUploadView.show(images);
    }
  }
}
