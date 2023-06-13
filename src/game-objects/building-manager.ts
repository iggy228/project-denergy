export class BuildingsManager {
  private static instance: BuildingsManager;

  private constructor() {}

  public static getInstance(): BuildingsManager {
    if (!BuildingsManager.instance) {
      BuildingsManager.instance = new BuildingsManager();
    }

    return BuildingsManager.instance;
  }
  // other things
  hutsCount = 0;

  loadDataFromStorage() {
    const savedData = localStorage.getItem("buildings");

    if (savedData) {
      const json = JSON.parse(savedData);
      this.hutsCount = json.huts;
    }
  }

  saveDataToStorage() {
    localStorage.setItem(
      "buildings",
      JSON.stringify({
        huts: this.hutsCount,
      })
    );
  }
}
