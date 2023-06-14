import { EngineConstants } from "./config/engine-constants";
import { ResourceConstants } from "./config/resources-constants";
import { RouteNames } from "./constants/route-names";
import { BuildingsManager } from "./game-objects/buildings-manager";
import { HUT } from "./game-objects/hut";
import { ResourceManager } from "./game-objects/resource-manager";
import { Router } from "./game-objects/router";
import { BuyButton } from "./ui/buy-button";
import { DarkEnergyBar } from "./ui/dark-energy-bar";

import $ from "jquery";

let resourceManager: ResourceManager;
let buildingsManager: BuildingsManager;
let darkEnergyBar: DarkEnergyBar;
let woodText: JQuery<HTMLElement>;
let woodMakeButton: JQuery<HTMLButtonElement>;
let router: Router;
let hutBuyButton: BuyButton;

function init() {
  // instance router with click navigation buttons
  router = new Router("magicView");
  $("#magicViewButton").on("click", () =>
    router.changeMainViewContent(RouteNames.magic)
  );
  $("#buildingsViewButton").on("click", () =>
    router.changeMainViewContent(RouteNames.buildings)
  );

  resourceManager = new ResourceManager();
  resourceManager.loadDataFromStorage();
  buildingsManager = new BuildingsManager(resourceManager);

  // dark energy bar
  darkEnergyBar = new DarkEnergyBar();
  darkEnergyBar.updateElement(
    resourceManager.darkEnergy.value,
    resourceManager.darkEnergy.capacity
  );
  darkEnergyBar.darkEnergyButtonEl.on("click", () => {
    resourceManager.darkEnergy.addValue(ResourceConstants.energyAddValue);
  });
  resourceManager.darkEnergy.addListener((resource) => {
    darkEnergyBar.updateElement(resource.value, resource.capacity);
  });

  // save button
  const saveButton = $("#save-button");
  saveButton.on("click", () => resourceManager.saveDataToStorage());

  // wood text
  woodText = $("#wood-text-value");
  woodText.text(
    `${resourceManager.wood.value}/${resourceManager.wood.capacity}`
  );
  resourceManager.wood.addListener((resource) => {
    woodText.text(`${resource.value}/${resource.capacity}`);
  });

  // wood make button
  woodMakeButton = $("#make-wood-btn");
  const woodButton = woodMakeButton.get(0);
  if (woodButton) {
    woodButton.disabled =
      resourceManager.darkEnergy.value < ResourceConstants.makeWoodBaseCost;
  }
  woodMakeButton.on("click", () => {
    resourceManager.darkEnergy.removeValue(ResourceConstants.makeWoodBaseCost);
    resourceManager.wood.addValue(ResourceConstants.makeWoodAddValue);
  });
  resourceManager.darkEnergy.addListener((resource) => {
    if (woodButton) {
      woodButton.disabled = resource.value < ResourceConstants.makeWoodBaseCost;
    }
  });

  // hut button
  hutBuyButton = new BuyButton("#hut-btn", {
    onClick: () => {
      buildingsManager.addHut();
      hutBuyButton.updateText(`Hut (${buildingsManager.hutsCount})`);
      hutBuyButton.updatePriceText(
        `${
          HUT.baseCost.wood *
          Math.pow(HUT.priceMultiplier, buildingsManager.hutsCount)
        } wood`
      );
    },
    text: "Hut",
    priceText: `${
      HUT.baseCost.wood *
      Math.pow(HUT.priceMultiplier, buildingsManager.hutsCount)
    } wood`,
  });
  resourceManager.wood.addListener((resource) => {
    if (
      resource.value <
      HUT.baseCost.wood *
        Math.pow(HUT.priceMultiplier, buildingsManager.hutsCount)
    ) {
      hutBuyButton.disable();
    } else {
      hutBuyButton.activate();
    }
  });
}

// in miliseconds
const autoSaveInterval = 60 * 1000;
let autoSaveTimer = 0;
function autoSaveData() {
  if (autoSaveTimer < autoSaveInterval) {
    autoSaveTimer += EngineConstants.milisecondsPerTick;
  } else {
    resourceManager.saveDataToStorage();
    autoSaveTimer = 0;
  }
}

function gameLoop() {
  init();

  setInterval(() => {
    resourceManager.updateResourcesValue();

    autoSaveData();
  }, EngineConstants.milisecondsPerTick);
}

gameLoop();
