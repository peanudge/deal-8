import { navigateTo } from "@/router";

import { attendChatRoomAsync } from "@/api/chat";
import {
  getCategoryAsync,
  getProductDetailAsync,
  updateProductStatusAsync,
} from "@/api/product";
import {
  getProfileAsync,
  removeInterestProductAsync,
  addInterestProductAsync,
} from "@/api/user";

export default class Controller {
  constructor(
    store,
    {
      productDetailHeaderView,
      productImageListView,
      productDetailView,
      productDetailFooterView,
      productDetailModalView,
    }
  ) {
    this.store = store;
    this.productId = store.productId;
    this.productDetailHeaderView = productDetailHeaderView;
    this.productImageListView = productImageListView;
    this.productDetailView = productDetailView;
    this.productDetailFooterView = productDetailFooterView;
    this.productDetailModalView = productDetailModalView;

    this.isShowModal = false;

    this.subscribeViewEvents();
    this.init();
  }

  subscribeViewEvents() {
    this.productDetailFooterView.on("@interest", (e) => {
      const { id, isInterested } = e.detail.value;
      this.changeInterest(id, isInterested);
    });

    this.productDetailHeaderView.on("@click-edit-post", () => {
      // TODO: Implement
    });

    this.productDetailHeaderView.on("@click-delete-post", () => {
      this.isShowModal = true;
      this.render();
    });

    this.productDetailModalView.on("@close-modal", () => {
      this.isShowModal = false;
      this.render();
    });

    this.productDetailModalView.on("@delete-post", () => {
      this.isShowModal = false;
      this.render();

      // TODO: navigation main.
    });

    this.productDetailView.on("@change-status", (e) => {
      const status = e.detail.value;
      updateProductStatusAsync(this.store.productId, status).then(
        ({ success }) => {
          if (success) {
            this.fetchProductDetailData();
          }
        }
      );
    });

    this.productDetailFooterView.on("@attend-chat-room", (e) => {
      // TODO: get Room Key API
      // TODO: with Room Key, Navigate To ChatRoom Page.
      const { productId } = this.store;
      attendChatRoomAsync(productId).then(({ success, roomId }) => {
        if (success) {
          navigateTo("/chat/" + roomId, { previous: "/product/" + productId });
        } else {
          console.error("채팅방 정보가져오는데 실패");
        }
      });
    });

    this.productDetailFooterView.on("@move-to-chatlist", (e) => {
      navigateTo("/chatList/" + this.store.productId);
    });
  }

  changeInterest(productId, isInterested) {
    if (isInterested) {
      addInterestProductAsync(productId).then((result) => {
        this.fetchProductDetailData();
      });
    } else {
      removeInterestProductAsync(productId).then((result) => {
        this.fetchProductDetailData();
      });
    }
  }

  init() {
    if (this.productId === undefined) {
      navigateTo("/");
    }

    getCategoryAsync(this.store.productId).then(({ success, category }) => {
      if (success) {
        this.store.categoryName = category.name;
      } else {
        this.store.categoryName = category.id;
      }
      this.render();
    });

    getProfileAsync().then(({ isAuth, account }) => {
      if (isAuth) {
        this.store.user = account;
        this.fetchProductDetailData();
      } else {
        navigateTo("/login");
      }
    });
  }

  fetchProductDetailData() {
    getProductDetailAsync(this.productId).then(({ success, product }) => {
      if (success) {
        this.store.productDetail = product;
        this.render();
      }
    });
  }

  render() {
    const { productDetail, user, categoryName } = this.store;

    if (this.isShowModal) {
      this.productDetailModalView.show();
    } else {
      this.productDetailModalView.hide();
    }

    this.productDetailHeaderView.show(user, productDetail);
    this.productImageListView.show(productDetail.images);
    this.productDetailView.show(user, productDetail, categoryName);
    this.productDetailFooterView.show(user, productDetail);
  }
}
