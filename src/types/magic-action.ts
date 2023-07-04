export interface MagicAction {
  name: string;
  baseCost?: {
    [key: string]: number;
  };
  effects?: {
    [key: string]: any;
  };
  show?: boolean;
}
