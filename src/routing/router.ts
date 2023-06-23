import $ from "jquery";

export class Router {
  routes = {
    magicView: false,
    buildingsView: false,
  };

  currentViewName: string;

  constructor(defaultView: string) {
    this.currentViewName = defaultView;
    $(`#${defaultView}`).removeClass("hide").addClass("show");
  }

  changeMainViewContent(view: string) {
    $(`#${this.currentViewName}`).removeClass("show").addClass("hide");
    $(`#${view}`).removeClass("hide").addClass("show");
    this.currentViewName = view;
  }
}
