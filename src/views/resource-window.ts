import $ from "jquery";
import { ResourcesManager } from "../game-objects/resources-manager";

export class ResourceWindow {
  resourceElements: { [key: string]: JQuery<HTMLElement> } = {};

  constructor(resourceManager: ResourcesManager) {
    for (const key in resourceManager.resources) {
      this.resourceElements[key] = $(
        `<p>${key}: ${resourceManager.resources[key].value}/${resourceManager.resources[key].capacity}</p>`
      ).addClass(resourceManager.resources[key].show ? "show" : "hide");
      $("#resource-window").append(this.resourceElements[key]);
    }
  }

  updateElement(key: string, text: string) {
    this.resourceElements[key].text(text);
  }

  updateElemets(resources: { [key: string]: string }) {
    for (const key in resources) {
      this.resourceElements[key].text(resources[key]);
    }
  }
}
