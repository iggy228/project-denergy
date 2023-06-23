export interface Building {
  name: string;
  production?: { [key: string]: number };
  baseCost: { [key: string]: number };
  priceMultiplier: number;
  capacity?: { [key: string]: number };
  effects?: { [key: string]: number };
}
