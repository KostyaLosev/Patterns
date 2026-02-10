import { Point } from './point.js';
import { Shape } from './shape.js';

export class Triangle extends Shape {
  private pointA: Point;

  private pointB: Point;

  private pointC: Point;

  public constructor(id: string, a: Point, b: Point, c: Point, name?: string) {
    super(id, 'triangle', name);
    this.pointA = a;
    this.pointB = b;
    this.pointC = c;
  }

  public get a(): Point {
    return this.pointA;
  }

  public get b(): Point {
    return this.pointB;
  }

  public get c(): Point {
    return this.pointC;
  }

  public updateA(point: Point): void {
    this.pointA = point;
    this.notifyChanged();
  }

  public updateB(point: Point): void {
    this.pointB = point;
    this.notifyChanged();
  }

  public updateC(point: Point): void {
    this.pointC = point;
    this.notifyChanged();
  }
}
