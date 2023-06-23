import { Building } from "../types/buildings";

export const Buildings: { [key: string]: Building } = {
  HUT: {
    name: "hut",
    capacity: {
      peoples: 2,
    },
    baseCost: {
      wood: 20,
    },
    priceMultiplier: 2,
  },
  TOTEM: {
    name: "totem",
    production: {
      darkEnergy: 0.2,
    },
    baseCost: {
      wood: 10,
    },
    priceMultiplier: 1.5,
  },
  STOCKPILE: {
    name: "stockpile",
    baseCost: {
      wood: 25,
    },
    priceMultiplier: 1.4,
  },
};
