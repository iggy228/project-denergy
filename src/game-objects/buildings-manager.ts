import { Buildings } from "./buildings";
import { ResourcesManager } from "./resources-manager";

export class BuildingsManager {
  private resourceManager: ResourcesManager;

  hutsCount = 0;
  stockpileCount = 0;
  totemCount = 0;

  constructor(resourceManager: ResourcesManager) {
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
      Buildings.HUT.baseCost.wood *
        Math.pow(Buildings.HUT.priceMultiplier, this.hutsCount)
    ) {
      this.resourceManager.wood.removeValue(
        Buildings.HUT.baseCost.wood *
          Math.pow(Buildings.HUT.priceMultiplier, this.hutsCount)
      );
      this.hutsCount += 1;
      return true;
    }
    return false;
  }

  addTotem(): boolean {
    if (
      this.resourceManager.wood.value >=
      Buildings.TOTEM.baseCost.wood *
        Math.pow(Buildings.TOTEM.priceMultiplier, this.totemCount)
    ) {
      this.resourceManager.wood.removeValue(
        Buildings.TOTEM.baseCost.wood *
          Math.pow(Buildings.HUT.priceMultiplier, this.totemCount)
      );
      this.totemCount += 1;
      return true;
    }
    return false;
  }

  addStockpile(): boolean {
    if (
      this.resourceManager.wood.value >=
      Buildings.STOCKPILE.baseCost.wood *
        Math.pow(Buildings.STOCKPILE.priceMultiplier, this.stockpileCount)
    ) {
      this.resourceManager.wood.removeValue(
        Buildings.STOCKPILE.baseCost.wood *
          Math.pow(Buildings.HUT.priceMultiplier, this.stockpileCount)
      );
      this.stockpileCount += 1;
      return true;
    }
    return false;
  }
}
