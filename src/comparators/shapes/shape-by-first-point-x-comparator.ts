import { Shape } from '../../entities/shape.js';
import { firstPoint } from '../../utils/shape-utils.js';
import { Comparator } from '../comparator.js';

export class ShapeByFirstPointXComparator implements Comparator<Shape> {
  public compare(a: Shape, b: Shape): number {
    return firstPoint(a).x - firstPoint(b).x;
  }
}
