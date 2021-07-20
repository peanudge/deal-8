import View from "@/page/View";

import { qs } from "@/helper/selectHelpers";

import addSVG from "@/public/svg/add.svg";
import closeSVG from "@/public/svg/close-white.svg";
import { delegate } from "@/helper/eventHelpers";

export default class LocationListView extends View {
  constructor(element = qs("#location-container")) {
    super(element);
    this.template = new Template();
    this.eventsBinding();
  }

  eventsBinding() {
    delegate(this.element, "click", "#close-btn", (e) =>
      this.handleLocationDeleteClickEvent(e)
    );
    delegate(this.element, "click", "#add-btn", (e) =>
      this.handleLocationAddClickEvent()
    );
  }

  handleLocationDeleteClickEvent(e) {
    const location = e.target.dataset.location;
    this.emit("@click-delete-location", { value: location });
  }

  handleLocationAddClickEvent() {
    this.emit("@click-add-location");
  }

  show(locations = ["상암동"]) {
    this.element.innerHTML = `
            ${this.template.getLocationCards(locations)}
            ${locations.length < 2 ? this.template.getAddLocationCard() : ""}
        `;
    super.show();
  }
}

class Template {
  getLocationCards(locations = []) {
    return locations
      .map((location) => this._getLocationCard(location))
      .join("");
  }

  _getLocationCard(locationName) {
    return /* html */ `
            <div class="location--container--location-card">
                <p>${locationName}</p>
                <div id="close-btn" class="close-icon" data-location="${locationName}" >${closeSVG}</div>
            </div>`;
  }

  getAddLocationCard() {
    return /* html */ `
        <div class="location--container--location-card empty">
            <div id="add-btn" class="plus-icon">${addSVG}</div>
        </div>`;
  }
}
