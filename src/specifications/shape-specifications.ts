import { Shape } from '../entities/shape.js';
import type { MetricName } from '../types/metrics.js';
import { firstPoint } from '../utils/shape-utils.js';
import { Warehouse } from '../warehouse/warehouse.js';
import { Specification } from './specification.js';

export class ShapeByIdSpecification implements Specification<Shape> {
  public constructor(private readonly id: string) {}

  public isSatisfiedBy(item: Shape): boolean {
    return item.id === this.id;
  }
}

export class ShapeByNameSpecification implements Specification<Shape> {
  public constructor(private readonly name: string) {}

  public isSatisfiedBy(item: Shape): boolean {
    return item.name.toLowerCase().includes(this.name.toLowerCase());
  }
}

export class ShapeByFirstPointQuadrantSpecification implements Specification<Shape> {
  public isSatisfiedBy(item: Shape): boolean {
    const point = firstPoint(item);
    return point.x > 0 && point.y > 0 && point.z >= 0;
  }
}

export class ShapeByMetricRangeSpecification implements Specification<Shape> {
  private readonly warehouse = Warehouse.getInstance();

  public constructor(
    private readonly metricName: MetricName,
    private readonly min: number,
    private readonly max: number,
  ) {}

  public isSatisfiedBy(item: Shape): boolean {
    const metrics = this.warehouse.get(item.id);
    const metricValue = metrics?.[this.metricName];

    if (typeof metricValue !== 'number') {
      return false;
    }

    return metricValue >= this.min && metricValue <= this.max;
  }
}

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
