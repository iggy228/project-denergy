import { Resource } from "../types/resource";

export const initialResourceValue: { [key: string]: Resource } = {
  mana: {
    name: "mana",
    value: 50,
    capacity: 1000,
    show: true,
    color: "blue",
  },
  wood: {
    name: "wood",
    value: 10,
    capacity: 100,
    show: true,
    color: "brown",
  },
  people: {
    name: "people",
    value: 0,
    capacity: 0,
    color: "gray",
  },
};
