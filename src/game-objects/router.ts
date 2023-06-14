import $ from "jquery";

export class Router {
  routes = {
    magicView: false,
    buildingsView: false,
  };

  currentViewName: string;

  constructor(defaultView: string) {
    this.currentViewName = defaultView;
    $(`#${defaultView}`).removeClass("d-none").addClass("d-block");
  }

  changeMainViewContent(view: string) {
    $(`#${this.currentViewName}`).removeClass("d-block").addClass("d-none");
    $(`#${view}`).removeClass("d-none").addClass("d-block");
    this.currentViewName = view;
  }
}
