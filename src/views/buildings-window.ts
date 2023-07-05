import $ from "jquery";
import { Building } from "../types/buildings";
import { BuildingsManager } from "../game-objects/buildings-manager";

export class BuildingsWindow {
  buildingsManager: BuildingsManager;
  buildingsElements: { [key: string]: JQuery<HTMLElement> } = {};

  constructor(buildingManager: BuildingsManager) {
    this.buildingsManager = buildingManager;

    for (const key in this.buildingsManager.buildings) {
      this.buildingsElements[key] = $(
        `<button>${this.buildingsManager.buildings[key].name}</button>`
      )
        .addClass(this.buildingsManager.buildings[key].show ? "show" : "hide")
        .addClass("mb-3");

      $("#buildingsView").append(this.buildingsElements[key]);
    }
  }

  addHandlerToActionButton(name: string, handler: (action: Building) => void) {
    if (this.buildingsElements[name]) {
      this.buildingsElements[name].on("click", () => {
        handler(this.buildingsManager[name]);
      });
    } else {
      console.warn(`Not found buildings with name: ${name}`);
    }
  }
}
