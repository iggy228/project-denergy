import { HUT } from "./hut";
import { ResourceManager } from "./resource-manager";

export class BuildingsManager {
  private resourceManager: ResourceManager;

  hutsCount = 0;

  constructor(resourceManager: ResourceManager) {
    this.resourceManager = resourceManager;
  }

  loadDataFromStorage() {
    const savedData = localStorage.getItem("buildings");

    if (savedData) {
      const json = JSON.parse(savedData);
      this.hutsCount = json.huts;
    }
  }

  saveDataToStorage() {
    localStorage.setItem(
      "buildings",
      JSON.stringify({
        huts: this.hutsCount,
      })
    );
  }

  // return true if hut was added otherwise false
  addHut(): boolean {
    if (
      this.resourceManager.wood.value >=
      HUT.baseCost.wood * Math.pow(HUT.priceMultiplier, this.hutsCount)
    ) {
      this.resourceManager.wood.removeValue(
        HUT.baseCost.wood * Math.pow(HUT.priceMultiplier, this.hutsCount)
      );
      this.hutsCount += 1;
      return true;
    }
    return false;
  }
}
