import { categoryItems } from "@/util/category";

import {
  createProductAsync,
  getCategoriesAsync,
  uploadProductImagesAsync,
  getProductDetailAsync,
} from "@/api/product";
import { navigateTo } from "@/router";
import { getProfileAsync } from "@/api/user";

const ERROR_EMPTY_CATEGORY = "(필수) 카테고리는 선택해주세요.";
const ERROR_EMPTY_TITLE = "글 제목을 입력해주세요.";

export default class Controller {
  constructor(
    store,
    {
      imageUploadView,
      modifyPostFormView,
      modifyPostHeaderView,
      categorySelectView,
    }
  ) {
    this.store = store;
    this.productId = store.productId;
    this.modifyPostHeaderView = modifyPostHeaderView;
    this.modifyPostFormView = modifyPostFormView;
    this.imageUploadView = imageUploadView;
    this.categorySelectView = categorySelectView;

    this.isShowCategorySelectView = false;
    this.error = {};
    this.subscribeViewEvents();

    this.init();
  }

  init() {
    const requestGetCategories = getCategoriesAsync();
    const requestGetProfile = getProfileAsync();

    Promise.all([requestGetCategories, requestGetProfile]).then(
      ([categoryResponse, profileResponse]) => {
        const categorySuccess = categoryResponse.success;
        const isAuth = profileResponse.isAuth;
        if (!isAuth) {
          navigateTo("/login");
        }
        if (categorySuccess) {
          this.store.categories = categoryResponse.categories;
        }
        this.fetchProductDetailData();
      }
    );
  }
  fetchProductDetailData() {
    getProductDetailAsync(this.productId).then(({ success, product }) => {
      if (success) {
        this.store.productDetail = product;
        const categoryNumber = Number(product.category);
        const categoryItem = this.store.categories.find(
          (categoryItem) => categoryNumber === categoryItem.id
        );

        this.store.productDetail.category = categoryItem;
      }
      this.render();
    });
  }

  subscribeViewEvents() {
    this.categorySelectView.on("@back", () => {
      this.isShowCategorySelectView = false;
      this.render();
    });

    this.categorySelectView.on("@select-category", (e) => {
      const categoryId = e.detail.value;
      const categoryNumber = Number(categoryId);
      const categoryItem = this.store.categories.find(
        (categoryItem) => categoryNumber === categoryItem.id
      );
      this.store.productDetail.category = categoryItem;
      this.isShowCategorySelectView = false;
      this.render();
    });

    this.modifyPostFormView.on("@show-select-category", () => {
      this.isShowCategorySelectView = true;
      this.render();
    });

    this.modifyPostFormView.on("@change-title", (e) => {
      const title = e.detail.value;
      this.store.title = title;
    });

    this.modifyPostFormView.on("@change-cost", (e) => {
      const cost = e.detail.value;
      this.store.cost = cost;
    });

    this.modifyPostFormView.on("@change-content", (e) => {
      const content = e.detail.value;
      this.store.content = content;
    });

    this.imageUploadView.on("@image-upload", (e) => {
      this.uploadImagesFromFileSystem(e.detail.value);
    });

    this.modifyPostHeaderView.on("@modify-post", (e) => this.modifyPost());

    this.modifyPostHeaderView.on("@go-to-back", () => {
      navigateTo(history.state.previous);
    });
  }

  modifyPost() {
    if (!this.validateStoreForSubmit(this.store)) {
      this.render();
      return;
    }

    const { images, category, cost, title, content, location } = this.store;
    uploadProductImagesAsync(images)
      .then(({ success, images }) => {
        if (success) {
          return modifyProductAsync({
            title,
            cost,
            content,
            location,
            images,
            category: category?.id,
          });
        } else {
          console.err("Image Upload Fail.");
        }
      })
      .then((result) => {
        if (result.success) {
          navigateTo("/product/" + result.product.id);
        } else {
          //TODO: Update Fail fallback
        }
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
      this.store.productDetail.images = files;
    }
    this.render();
  }

  render() {
    const { images, category, content, title, location, cost } =
      this.store.productDetail;
    const { categories } = this.store;

    if (this.isShowCategorySelectView) {
      this.categorySelectView.show(categories);
      this.modifyPostFormView.hide();
      this.modifyPostHeaderView.hide();
    } else {
      this.categorySelectView.hide();
      console.log(images);
      this.imageUploadView.show(images);
      this.modifyPostFormView.show(
        {
          title,
          content,
          cost,
          location,
          category: category?.name,
        },
        this.error
      );
      this.modifyPostHeaderView.show();
    }
  }
}
