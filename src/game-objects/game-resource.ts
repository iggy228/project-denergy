export class GameResource {
  value: number;
  capacity: number;
  listeners: ((resource: GameResource) => void)[];

  constructor(data: Partial<GameResource>) {
    this.value = data.value ?? 0;
    this.capacity = data.capacity ?? 0;
    this.listeners = this.listeners ?? [];
  }

  static fromObject(object: { [key: string]: any }) {
    return new GameResource(object);
  }

  toObject(): { [key: string]: any } {
    return {
      value: this.value,
      capacity: this.capacity,
    };
  }

  addValue(value: number) {
    if (this.value < this.capacity) {
      this.value += value;
      return;
    }
    this.value = this.capacity;
  }
}
