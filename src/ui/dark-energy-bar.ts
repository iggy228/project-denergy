import $ from "jquery";

export class DarkEnergyBar {
  darkEnergyProgressEl: JQuery<HTMLElement>;
  darkEnergyTextEl: JQuery<HTMLElement>;
  darkEnergyButtonEl: JQuery<HTMLButtonElement>;

  constructor() {
    const el = $("#dark-energy-bar");

    this.darkEnergyProgressEl = el.children("div");
    this.darkEnergyTextEl = el.children("span");
    this.darkEnergyButtonEl = $(
      "#dark-energy-button"
    ) as JQuery<HTMLButtonElement>;
  }

  updateElement(value: number, maxValue: number) {
    this.darkEnergyProgressEl.css("width", `${(value / maxValue) * 100}%`);
    this.darkEnergyTextEl.html(`${value}/${maxValue}`);
  }
}
