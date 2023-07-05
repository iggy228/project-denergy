import { EngineConstants } from "./config/engine-constants";
import { ResourceConstants } from "./config/resources-constants";
import { RouteNames } from "./constants/route-names";
import { BuildingsManager } from "./game-objects/buildings-manager";
import { Buildings } from "./game-objects/buildings";
import { ResourcesManager } from "./game-objects/resources-manager";
import { Router } from "./routing/router";
import { BuyButton } from "./ui/buy-button";

import $ from "jquery";
import { ResourceWindow } from "./views/resource-window";
import { MagicWindow } from "./views/magic-window";
import { makeResourceString } from "./utils/utils";
import { BuildingsWindow } from "./views/buildings-window";

let resourceManager: ResourcesManager;
let buildingsManager: BuildingsManager;
let resourceWindow: ResourceWindow;
let magicWindow: MagicWindow;
let buildingsWindow: BuildingsWindow;
let router: Router;

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

  resourceWindow = new ResourceWindow(resourceManager);
  magicWindow = new MagicWindow();

  buildingsWindow = new BuildingsWindow(buildingsManager);

  // save button
  const saveButton = $("#save-button");
  saveButton.on("click", () => resourceManager.saveDataToStorage());

  magicWindow.addHandlerToActionButton("focus_mana", (action) => {
    resourceManager.addValueToResource("mana", 1);
    resourceWindow.updateElement(
      "mana",
      makeResourceString(resourceManager.resources["mana"])
    );
  });
  magicWindow.addHandlerToActionButton("make_wood", (action) => {
    if (action.baseCost) {
      if (resourceManager.resources["mana"].value >= action.baseCost["mana"]) {
        resourceManager.subtractValueFromResource(
          "mana",
          action.baseCost["mana"]
        );
        resourceManager.addValueToResource("wood", 1);
        resourceWindow.updateElemets({
          wood: makeResourceString(resourceManager.resources["wood"]),
          mana: makeResourceString(resourceManager.resources["mana"]),
        });
      }
    }
  });

  resourceManager.addListener((resources) => {
    for (const [key, value] of Object.entries(magicWindow.magicActions)) {
      if (value.baseCost) {
        let disable = false;
        for (const [name, price] of Object.entries(value.baseCost)) {
          if (resources[name].value < price) {
            disable = true;
            break;
          }
        }
        magicWindow.magicActionsElements[key].prop("disabled", disable);
      }
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
