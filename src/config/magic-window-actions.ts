import { MagicAction } from "../types/magic-action";

export const magicActionsConfig: { [key: string]: MagicAction } = {
  focus_mana: {
    name: "focus_mana",
    show: true,
    effects: {
      energy: 1,
    },
  },
  make_wood: {
    name: "make_wood",
    show: true,
    baseCost: {
      mana: 20,
    },
    effects: {
      energy: 1,
    },
  },
};
