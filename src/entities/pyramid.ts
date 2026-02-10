import { Point } from './point.js';
import { Shape } from './shape.js';

export class Pyramid extends Shape {
  public readonly p1: Point;

  public readonly p2: Point;

  public readonly p3: Point;

  public readonly p4: Point;

  public constructor(id: string, p1: Point, p2: Point, p3: Point, p4: Point) {
    super(id, 'pyramid');
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }
}
