import { Building } from "../types/buildings";

export const buildingsConfig: { [key: string]: Building } = {
  totem: {
    name: "totem",
    count: 0,
    baseCost: {
      wood: 5,
    },
    effects: {
      focus_mana: 1,
    },
    priceMultiplier: 1.2,
    show: true,
  },
  hut: {
    name: "hut",
    count: 0,
    baseCost: { wood: 20 },
    capacity: {
      people: 3,
    },
    priceMultiplier: 2,
    show: true,
  },
  stockpile: {
    name: "stockpile",
    count: 0,
    baseCost: { wood: 20 },
    capacity: {
      wood: 100,
    },
    priceMultiplier: 1.5,
    show: true,
  },
};
