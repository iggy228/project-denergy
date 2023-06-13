import { EngineConstants } from "./config/engine-constants";
import { ResourceConstants } from "./config/resources-constants";
import { GameManager } from "./game-objects/game-manager";
import { DarkEnergyBar } from "./ui/dark-energy-bar";

import $ from "jquery";

let gameManager: GameManager;
let darkEnergyBar: DarkEnergyBar;
let woodText: JQuery<HTMLElement>;
let woodMakeButton: JQuery<HTMLButtonElement>;

function init() {
  gameManager = GameManager.getInstance();
  gameManager.loadDataFromStorage();

  // dark energy bar
  darkEnergyBar = new DarkEnergyBar();
  darkEnergyBar.updateElement(
    gameManager.darkEnergy.value,
    gameManager.darkEnergy.capacity
  );
  darkEnergyBar.darkEnergyButtonEl.on("click", () => {
    gameManager.darkEnergy.addValue(ResourceConstants.energyAddValue);
  });
  gameManager.darkEnergy.addListener((resource) => {
    darkEnergyBar.updateElement(resource.value, resource.capacity);
  });

  // save button
  const saveButton = $("#save-button");
  saveButton.on("click", () => gameManager.saveDataToStorage());

  // wood text
  woodText = $("#wood-text-value");
  woodText.text(`${gameManager.wood.value}/${gameManager.wood.capacity}`);
  gameManager.wood.addListener((resource) => {
    woodText.text(`${resource.value}/${resource.capacity}`);
  });

  // wood make button
  woodMakeButton = $("#make-wood-btn");
  const woodButton = woodMakeButton.get(0);
  if (woodButton) {
    woodButton.disabled =
      gameManager.wood.value < ResourceConstants.makeWoodBaseCost;
  }
  woodMakeButton.on("click", () => {
    gameManager.darkEnergy.removeValue(ResourceConstants.makeWoodBaseCost);
    gameManager.wood.addValue(ResourceConstants.makeWoodAddValue);
  });
  gameManager.darkEnergy.addListener((resource) => {
    if (woodButton) {
      woodButton.disabled = resource.value < ResourceConstants.makeWoodBaseCost;
    }
  });
}

// in miliseconds
const autoSaveInterval = 60 * 1000;
let autoSaveTimer = 0;
function autoSaveData() {
  console.log(autoSaveTimer);
  if (autoSaveTimer < autoSaveInterval) {
    autoSaveTimer += EngineConstants.milisecondsPerTick;
  } else {
    gameManager.saveDataToStorage();
    autoSaveTimer = 0;
  }
}

function gameLoop() {
  init();

  setInterval(() => {
    gameManager.updateResourcesValue();

    autoSaveData();
  }, EngineConstants.milisecondsPerTick);
}

gameLoop();
