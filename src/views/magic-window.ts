import $ from "jquery";
import { magicActionsConfig } from "../config/magic-window-actions";
import { MagicAction } from "../types/magic-action";

export class MagicWindow {
  magicActions = magicActionsConfig;
  magicActionsElements: { [key: string]: JQuery<HTMLElement> } = {};

  constructor() {
    for (const key in this.magicActions) {
      this.magicActionsElements[key] = $(
        `<button>${this.magicActions[key].name}</button>`
      )
        .addClass(this.magicActions[key].show ? "show" : "hide")
        .addClass("mb-3");

      $("#magicView").append(this.magicActionsElements[key]);
    }
  }

  addHandlerToActionButton(
    name: string,
    handler: (action: MagicAction) => void
  ) {
    if (this.magicActionsElements[name]) {
      this.magicActionsElements[name].on("click", () => {
        handler(this.magicActions[name]);
      });
    } else {
      console.warn(`Not found magic action with name: ${name}`);
    }
  }
}
