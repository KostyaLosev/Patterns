import { Shape } from '../entities/shape.js';
import { firstPoint } from '../utils/shape-utils.js';
import { Comparator } from './comparator.js';

export class ShapeByIdComparator implements Comparator<Shape> {
  public compare(a: Shape, b: Shape): number {
    return a.id.localeCompare(b.id);
  }
}

export class ShapeByNameComparator implements Comparator<Shape> {
  public compare(a: Shape, b: Shape): number {
    return a.name.localeCompare(b.name);
  }
}

export class ShapeByFirstPointXComparator implements Comparator<Shape> {
  public compare(a: Shape, b: Shape): number {
    return firstPoint(a).x - firstPoint(b).x;
  }
}

export class ShapeByFirstPointYComparator implements Comparator<Shape> {
  public compare(a: Shape, b: Shape): number {
    return firstPoint(a).y - firstPoint(b).y;
  }
}
