import { EngineConstants } from "./config/engine-constants";
import { ResourceConstants } from "./config/resources-constants";
import { RouteNames } from "./constants/route-names";
import { BuildingsManager } from "./game-objects/buildings-manager";
import { Buildings } from "./game-objects/buildings";
import { ResourcesManager } from "./game-objects/resources-manager";
import { Router } from "./routing/router";
import { BuyButton } from "./ui/buy-button";
import { DarkEnergyBar } from "./ui/dark-energy-bar";

import $ from "jquery";
import { ResourceWindow } from "./views/resource-window";

let resourceManager: ResourcesManager;
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

  resourceManager = new ResourcesManager();
  resourceManager.loadDataFromStorage();
  buildingsManager = new BuildingsManager(resourceManager);

  new ResourceWindow(resourceManager);
  // dark energy bar

  // save button
  const saveButton = $("#save-button");
  saveButton.on("click", () => resourceManager.saveDataToStorage());

  // wood make button
  woodMakeButton = $("#make-wood-btn");
  const woodButton = woodMakeButton.get(0);
  if (woodButton) {
    woodButton.disabled =
      resourceManager.resources["dark_energy"].value <
      ResourceConstants.makeWoodBaseCost;
  }
  woodMakeButton.on("click", () => {
    resourceManager.changeValueBy(
      "dark_energy",
      -ResourceConstants.makeWoodBaseCost
    );
    resourceManager.changeValueBy("wood", ResourceConstants.makeWoodAddValue);
  });
  resourceManager.addListener((resources) => {
    if (woodButton) {
      woodButton.disabled =
        resources["dark_energy"].value < ResourceConstants.makeWoodBaseCost;
    }
  });

  // hut button
  hutBuyButton = new BuyButton("#hut-btn", {
    onClick: () => {
      buildingsManager.addHut();
      hutBuyButton.updateText(`Hut (${buildingsManager.hutsCount})`);
      hutBuyButton.updatePriceText(
        `${
          Buildings.HUT.baseCost.wood *
          Math.pow(Buildings.HUT.priceMultiplier, buildingsManager.hutsCount)
        } wood`
      );
    },
    text: "Hut",
    priceText: `${
      Buildings.HUT.baseCost.wood *
      Math.pow(Buildings.HUT.priceMultiplier, buildingsManager.hutsCount)
    } wood`,
  });
  resourceManager.addListener((resources) => {
    if (
      resources["wood"].value <
      Buildings.HUT.baseCost.wood *
        Math.pow(Buildings.HUT.priceMultiplier, buildingsManager.hutsCount)
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
    autoSaveData();
  }, EngineConstants.milisecondsPerTick);
}

gameLoop();
