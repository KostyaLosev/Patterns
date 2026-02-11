import { Shape } from '../../entities/shape.js';
import { firstPoint } from '../../utils/shape-utils.js';
import { Specification } from '../specification.js';

export class ShapeByFirstPointQuadrantSpecification implements Specification<Shape> {
  public isSatisfiedBy(item: Shape): boolean {
    const point = firstPoint(item);
    return point.x > 0 && point.y > 0 && point.z >= 0;
  }
}
