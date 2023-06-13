import { GameResource } from "./game-resource";

export class GameManager {
  private static instance: GameManager;

  private constructor() {}

  public static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }

    return GameManager.instance;
  }

  // other things
  darkEnergy: GameResource;
  wood: GameResource;

  loadDataFromStorage() {
    const savedData = localStorage.getItem("production");

    if (savedData) {
      const json = JSON.parse(savedData);
      this.darkEnergy = new GameResource(
        json.darkEnergy ?? {
          value: 0,
          capacity: 1000,
        }
      );
      this.wood = new GameResource(
        json.wood ?? {
          value: 0,
          capacity: 100,
        }
      );
    }
  }

  saveDataToStorage() {
    localStorage.setItem(
      "production",
      JSON.stringify({
        darkEnergy: this.darkEnergy.toObject(),
        wood: this.wood.toObject(),
      })
    );
  }

  updateResourcesValue() {}
}
