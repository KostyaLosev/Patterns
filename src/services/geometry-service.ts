import { EPSILON } from '../constants/math.js';
import { Point } from '../entities/point.js';

export class GeometryService {
  public distance(p1: Point, p2: Point): number {
    return Math.sqrt(
      (p1.x - p2.x) ** 2
      + (p1.y - p2.y) ** 2
      + (p1.z - p2.z) ** 2,
    );
  }

  public triangleArea(a: Point, b: Point, c: Point): number {
    const ab = this.vector(a, b);
    const ac = this.vector(a, c);
    const cross = this.cross(ab, ac);

    return 0.5 * Math.sqrt(cross.x ** 2 + cross.y ** 2 + cross.z ** 2);
  }

  public areCollinear(a: Point, b: Point, c: Point): boolean {
    return this.triangleArea(a, b, c) < EPSILON;
  }

  public dot(v1: Point, v2: Point): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  public vector(p1: Point, p2: Point): Point {
    return new Point(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
  }

  public cross(v1: Point, v2: Point): Point {
    return new Point(
      v1.y * v2.z - v1.z * v2.y,
      v1.z * v2.x - v1.x * v2.z,
      v1.x * v2.y - v1.y * v2.x,
    );
  }

  public tetrahedronVolume(a: Point, b: Point, c: Point, d: Point): number {
    const ab = this.vector(a, b);
    const ac = this.vector(a, c);
    const ad = this.vector(a, d);
    const cross = this.cross(ac, ad);

    return Math.abs(this.dot(ab, cross)) / 6;
  }
}
