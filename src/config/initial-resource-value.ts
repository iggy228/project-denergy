import { Resource } from "../types/resource";

export const initialResourceValue: { [key: string]: Resource } = {
  dark_energy: {
    name: "dark_energy",
    value: 50,
    capacity: 1000,
    show: true,
    color: "purple",
  },
  wood: {
    name: "wood",
    value: 0,
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
