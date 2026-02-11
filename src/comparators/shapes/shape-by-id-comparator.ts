import { Shape } from '../../entities/shape.js';
import { Comparator } from '../comparator.js';

export class ShapeByIdComparator implements Comparator<Shape> {
  public compare(a: Shape, b: Shape): number {
    return a.id.localeCompare(b.id);
  }
}
