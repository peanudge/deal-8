import { addLocationAsync, removeLocationAsync } from "@/api/user";

import { getProfileAsync } from "@/api/user";
import { navigateTo } from "@/router";

const ERROR_LOCATION_NEED = "적어도 하나의 동네는 존재해야합니다.";

export default class Controller {
  constructor(
    store,
    {
      locationListView,
      deleteLocationModalView,
      addLocationModalView,
      locationCommentView,
    }
  ) {
    this.store = store;

    this.deleteLocationModalView = deleteLocationModalView;
    this.addLocationModalView = addLocationModalView;
    this.locationListView = locationListView;
    this.locationCommentView = locationCommentView;

    this.isShowDeleteLocationModal = false;
    this.isShowAddLocationModal = false;

    this.error = {};

    this.subscribeViewEvents();
    this.fetchData();
    this.render();
  }

  fetchData() {
    getProfileAsync().then(({ isAuth, account }) => {
      if (!isAuth) {
        navigateTo("/login");
      } else {
        const { locations } = account;
        this.store.locations = locations;
        this.render();
      }
    });
  }

  validateLocationCount() {
    if (this.store.locations.length <= 1) {
      this.error = {
        location: ERROR_LOCATION_NEED,
      };
      return false;
    } else {
      this.error = {};
      return true;
    }
  }

  subscribeViewEvents() {
    this.locationListView.on("@click-delete-location", (e) => {
      if (this.validateLocationCount()) {
        this.showDeleteLocationModal(e.detail.value);
      } else {
        this.render();
      }
    });

    this.locationListView.on("@click-add-location", (e) =>
      this.showAddLocationModal()
    );

    this.deleteLocationModalView.on("@close-delete-modal", (e) => {
      this.hideDeleteLocationModal();
    });

    this.deleteLocationModalView.on("@delete-location", (e) => {
      this.deleteLocation();
      this.hideDeleteLocationModal();
    });

    this.addLocationModalView.on("@close-add-modal", (e) => {
      this.hideAddLocationModal();
    });

    this.addLocationModalView.on("@add-location", (e) => {
      const location = e.detail.value;
      this.addLocation(location);
      this.hideAddLocationModal();
    });
  }

  addLocation(location) {
    addLocationAsync(location).then(({ success, account }) => {
      if (success) {
        const { locations } = account;
        this.store.locations = locations;
        this.clearError();
        this.render();
      } else {
        this.fetchData();
      }
    });
  }

  deleteLocation() {
    const location = this.store.targetLocation;
    removeLocationAsync(location).then(({ success, account }) => {
      if (success) {
        const { locations } = account;
        this.store.locations = locations;
        this.clearError();
        this.render();
      } else {
        this.fetchData();
      }
    });
  }

  clearError() {
    this.error = {};
  }

  showDeleteLocationModal(location) {
    this.isShowDeleteLocationModal = true;
    this.store.targetLocation = location;
    this.render();
  }

  hideDeleteLocationModal() {
    this.isShowDeleteLocationModal = false;
    this.render();
  }

  showAddLocationModal() {
    this.isShowAddLocationModal = true;
    this.render();
  }

  hideAddLocationModal() {
    this.isShowAddLocationModal = false;
    this.render();
  }

  render() {
    const { targetLocation, locations } = this.store;

    this.locationListView.show(locations);

    this.locationCommentView.show(this.error);

    if (this.isShowAddLocationModal) {
      this.addLocationModalView.show();
    } else {
      this.addLocationModalView.hide();
    }

    if (this.isShowDeleteLocationModal) {
      this.deleteLocationModalView.show(targetLocation);
    } else {
      this.deleteLocationModalView.hide();
    }
  }
}
