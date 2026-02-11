import { Shape } from '../../entities/shape.js';
import { Specification } from '../specification.js';

export class ShapeByIdSpecification implements Specification<Shape> {
  public constructor(private readonly id: string) {}

  public isSatisfiedBy(item: Shape): boolean {
    return item.id === this.id;
  }
}
