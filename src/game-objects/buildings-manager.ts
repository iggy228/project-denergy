import { buildingsConfig } from "../config/buildings";
import { ResourcesManager } from "./resources-manager";

export class BuildingsManager {
  private resourceManager: ResourcesManager;
  buildings = buildingsConfig;

  constructor(resourceManager: ResourcesManager) {
    this.resourceManager = resourceManager;
  }

  loadDataFromStorage() {
    const savedData = localStorage.getItem("buildings");

    if (savedData) {
      const json = JSON.parse(savedData);
      this.buildings = json.buildings;
    }
  }

  saveDataToStorage() {
    localStorage.setItem("buildings", JSON.stringify(this.buildings));
  }

  // return true if hut was added otherwise false
  addBuilding(name: string): boolean {
    const building = this.buildings[name];

    for (const [resourceName, value] of Object.entries(building.baseCost)) {
      if (
        this.resourceManager[resourceName].value <
        value * Math.pow(building.priceMultiplier, building.count)
      ) {
        return false;
      }
    }
    building.count++;
    return true;
  }
}
