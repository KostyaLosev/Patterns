import { Shape } from '../../entities/shape.js';
import { Specification } from '../specification.js';

export class ShapeByNameSpecification implements Specification<Shape> {
  public constructor(private readonly name: string) {}

  public isSatisfiedBy(item: Shape): boolean {
    return item.name.toLowerCase().includes(this.name.toLowerCase());
  }
}
