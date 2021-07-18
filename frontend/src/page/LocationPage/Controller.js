export default class Controller {
  constructor(
    store,
    { locationListView, deleteLocationModalView, addLocationModalView }
  ) {
    this.store = store;

    this.deleteLocationModalView = deleteLocationModalView;
    this.addLocationModalView = addLocationModalView;
    this.locationListView = locationListView;

    this.isShowDeleteLocationModal = false;
    this.isShowAddLocationModal = false;

    this.subscribeViewEvents();
    this.render();
  }
  subscribeViewEvents() {
    this.locationListView.on("@click-delete-location", (e) => {
      this.showDeleteLocationModal(e.detail.value);
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
    // TODO: CAll Location 추가 API
    console.log(location + " 추가");
  }

  deleteLocation() {
    // TODO: CAll Location Delete API
    console.log(this.store.targetLocation + " 제거");
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
    const { targetLocation } = this.store;

    this.locationListView.show();

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
