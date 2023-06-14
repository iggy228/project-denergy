import $ from "jquery";

export class BuyButton {
  button: JQuery<HTMLButtonElement>;

  constructor(
    selector: string,
    props: {
      onClick: () => void;
      text?: string;
      priceText?: string;
      disable?: boolean;
    }
  ) {
    this.button = $(selector);
    this.button.on("click", props.onClick);
    if (props.text) {
      this.button.children("p:first").text(props.text);
    }
    if (props.priceText) {
      this.button.children("p:last").text(props.priceText);
    }
    if (props.disable) {
      this.button.prop("disabled", props.disable);
    }
  }

  updateText(text: string) {
    this.button.children("p:first").text(text);
  }
  updatePriceText(text: string) {
    this.button.children("p:last").text(text);
  }
  disable() {
    this.button.prop("disabled", true);
  }
  activate() {
    this.button.prop("disabled", false);
  }
}
