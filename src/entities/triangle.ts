import { Point } from './point.js';
import { Shape } from './shape.js';

export class Triangle extends Shape {
  public readonly a: Point;

  public readonly b: Point;

  public readonly c: Point;

  public constructor(id: string, a: Point, b: Point, c: Point) {
    super(id, 'triangle');
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
