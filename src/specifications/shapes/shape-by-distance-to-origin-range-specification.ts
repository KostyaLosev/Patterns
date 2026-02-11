import { Shape } from '../../entities/shape.js';
import { Warehouse } from '../../warehouse/warehouse.js';
import { Specification } from '../specification.js';

export class ShapeByDistanceToOriginRangeSpecification implements Specification<Shape> {
  private readonly warehouse = Warehouse.getInstance();

  public constructor(
    private readonly min: number,
    private readonly max: number,
  ) {}

  public isSatisfiedBy(item: Shape): boolean {
    const distance = this.warehouse.get(item.id)?.distanceToOrigin;

    if (typeof distance !== 'number') {
      return false;
    }

    return distance >= this.min && distance <= this.max;
  }
}
