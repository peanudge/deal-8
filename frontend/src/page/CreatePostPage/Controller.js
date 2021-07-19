import { categoryItems } from "@/util/category";

import { createProductAsync } from "@/api/product";
import { navigateTo } from "@/router";
import { getProfileAsync } from "@/api/user";

const tag = "[Controller]";

const ERROR_EMPTY_CATEGORY = "(필수) 카테고리는 선택해주세요.";
const ERROR_EMPTY_TITLE = "글 제목을 입력해주세요.";

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
    this.error = {};
    this.fetchData();
    this.subscribeViewEvents();
    this.render();
  }

  fetchData() {
    getProfileAsync().then(({ isAuth, account }) => {
      if (isAuth) {
        const { locations } = account;
        this.store.location = locations[0];
        this.render();
      } else {
        navigateTo("/login");
      }
    });
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
      if (!this.validateStoreForSubmit(this.store)) {
        this.render();
        return;
      }

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

      // TODO: add image upload api
    });
  }

  validateStoreForSubmit() {
    const error = {};
    if (this.store.category === null) {
      error.category = ERROR_EMPTY_CATEGORY;
    }
    if (!this.store.title || this.store.title === "") {
      error.title = ERROR_EMPTY_TITLE;
    }
    this.error = error;
    return Object.keys(this.error).length === 0;
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
      this.createPostFormView.show(
        {
          title,
          comment,
          cost,
          location,
          category: category?.name,
        },
        this.error
      );
      this.createPostHeaderView.show();
    }
  }
}
