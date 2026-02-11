import { Shape } from '../../entities/shape.js';
import { Comparator } from '../comparator.js';

export class ShapeByNameComparator implements Comparator<Shape> {
  public compare(a: Shape, b: Shape): number {
    return a.name.localeCompare(b.name);
  }
}
