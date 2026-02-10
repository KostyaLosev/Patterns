import { Point } from './point.js';
import { Shape } from './shape.js';

export class Pyramid extends Shape {
  private point1: Point;

  private point2: Point;

  private point3: Point;

  private point4: Point;

  public constructor(id: string, p1: Point, p2: Point, p3: Point, p4: Point, name?: string) {
    super(id, 'pyramid', name);
    this.point1 = p1;
    this.point2 = p2;
    this.point3 = p3;
    this.point4 = p4;
  }

  public get p1(): Point {
    return this.point1;
  }

  public get p2(): Point {
    return this.point2;
  }

  public get p3(): Point {
    return this.point3;
  }

  public get p4(): Point {
    return this.point4;
  }

  public updateP1(point: Point): void {
    this.point1 = point;
    this.notifyChanged();
  }

  public updateP2(point: Point): void {
    this.point2 = point;
    this.notifyChanged();
  }

  public updateP3(point: Point): void {
    this.point3 = point;
    this.notifyChanged();
  }

  public updateP4(point: Point): void {
    this.point4 = point;
    this.notifyChanged();
  }
}
