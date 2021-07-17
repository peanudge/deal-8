import { categoryItems } from "@/util/category";

import { createProductAsync } from "@/api/product";
import { navigateTo } from "@/router";

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

    this.categorySelectView.on("@select-category", (e) => {
      const categoryId = e.detail.value;

      categoryItems.forEach((categoryItem) => {
        if (categoryItem.id === Number(categoryId)) {
          this.store.category = categoryItem;
        }
      });

      this.isShowCategorySelectView = false;
      this.render();
    });

    this.createPostFormView.on("@show-select-category", () => {
      this.isShowCategorySelectView = true;
      this.render();
    });

    this.createPostFormView.on("@change-title", (e) => {
      const title = e.detail.value;
      this.store.title = title;
    });

    this.createPostFormView.on("@change-cost", (e) => {
      const cost = e.detail.value;
      this.store.cost = cost;
    });

    this.createPostFormView.on("@change-comment", (e) => {
      const comment = e.detail.value;
      this.store.comment = comment;
    });

    this.imageUploadView.on("@image-upload", (e) => {
      this.uploadImagesFromFileSystem(e.detail.value);
    });

    this.createPostHeaderView.on("@create-post", (e) => {
      const { images, category, cost, title, comment, location } = this.store;

      createProductAsync({
        title,
        cost,
        comment,
        location,
        category: category.id,
      }).then((id) => {
        navigateTo("/product/" + id);
      });
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
    const { images, category, comment, title, location, cost } = this.store;
    if (this.isShowCategorySelectView) {
      this.categorySelectView.show();
      this.createPostFormView.hide();
      this.createPostHeaderView.hide();
    } else {
      this.categorySelectView.hide();
      this.imageUploadView.show(images);
      this.createPostFormView.show({
        title,
        comment,
        cost,
        location,
        category: category?.name,
      });
      this.createPostHeaderView.show();
    }
  }
}
