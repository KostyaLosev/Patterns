import { Shape } from '../../entities/shape.js';
import type { MetricName } from '../../types/metrics.js';
import { Warehouse } from '../../warehouse/warehouse.js';
import { Specification } from '../specification.js';

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
