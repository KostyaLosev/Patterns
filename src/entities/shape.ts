import type { ShapeType } from '../types/shape.js';

export abstract class Shape {
  public readonly id: string;

  public readonly type: ShapeType;

  protected constructor(id: string, type: ShapeType) {
    this.id = id;
    this.type = type;
  }
}
