export interface Building {
  name: string;
  count: number;
  baseCost: { [key: string]: number };
  priceMultiplier: number;
  capacity?: { [key: string]: number };
  effects?: { [key: string]: number };
  show?: boolean;
}
