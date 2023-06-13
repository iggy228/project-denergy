export class Wood {
  value: number;
  capacity: number;

  constructor(data: Partial<Wood>) {
    this.value = data.value ?? 0;
    this.capacity = data.capacity ?? 1000;
  }

  static fromObject(object: { [key: string]: any }) {
    return new Wood(object);
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
    }
    if (this.value > this.capacity) {
      this.value = this.capacity;
    }
  }
}
