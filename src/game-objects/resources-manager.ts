import { initialResourceValue } from "../config/initial-resource-value";
import { Resource } from "../types/resource";

export class ResourcesManager {
  resources: { [key: string]: Resource } = {
    dark_energy: {
      name: "dark_energy",
      capacity: 1000,
      value: 0,
      show: true,
      color: "purple",
    },
    wood: {
      name: "wood",
      capacity: 100,
      value: 0,
      show: false,
      color: "brown",
    },
    people: {
      name: "people",
      capacity: 0,
      value: 0,
      show: false,
      color: "gray",
    },
  };
  listeners: ((resources: { [key: string]: Resource }) => void)[] = [];

  constructor() {
    this.resources = initialResourceValue;
  }

  loadDataFromStorage() {
    const savedData = localStorage.getItem("resources");

    if (savedData) {
      this.resources = JSON.parse(savedData);
    }
  }

  saveDataToStorage() {
    localStorage.setItem("resources", JSON.stringify(this.resources));
  }

  changeValueBy(resource: string, value: number) {
    this.resources[resource].value += value;
    if (this.resources[resource].value > this.resources[resource].capacity) {
      this.resources[resource].value = this.resources[resource].capacity;
    }
    if (this.resources[resource].value < 0) {
      this.resources[resource].value = 0;
    }
    this.notifyListeners();
  }

  // observers
  addListener(listener: (resources: { [key: string]: Resource }) => void) {
    this.listeners.push(listener);
  }
  removeListeners() {
    this.listeners = [];
  }
  notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.resources);
    }
  }
}