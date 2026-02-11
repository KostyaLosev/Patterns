import { Comparator } from '../comparators/comparator.js';
import { Shape } from '../entities/shape.js';
import { WarehouseObserver } from '../observers/warehouse-observer.js';
import { ShapeMetricsService } from '../services/shape-metrics-service.js';
import { Specification } from '../specifications/specification.js';
import { Warehouse } from '../warehouse/warehouse.js';

export class ShapeRepository {
  private readonly data = new Map<string, Shape>();

  private readonly warehouse = Warehouse.getInstance();

  private readonly observer = new WarehouseObserver();

  private readonly metricsService = new ShapeMetricsService();

  public add(shape: Shape): void {
    shape.attach(this.observer);
    this.data.set(shape.id, shape);
    this.warehouse.set(shape.id, this.metricsService.calculate(shape));
  }

  public removeById(id: string): boolean {
    const shape = this.data.get(id);

    if (!shape) {
      return false;
    }

    shape.detach(this.observer);
    this.data.delete(id);
    this.warehouse.delete(id);

    return true;
  }

  public getById(id: string): Shape | undefined {
    return this.data.get(id);
  }

  public getAll(): Shape[] {
    return Array.from(this.data.values());
  }

  public find(specification: Specification<Shape>): Shape[] {
    return this.getAll().filter((shape) => specification.isSatisfiedBy(shape));
  }

  public sort(comparator: Comparator<Shape>): Shape[] {
    return this.getAll().sort((a, b) => comparator.compare(a, b));
  }

  public clear(): void {
    this.getAll().forEach((shape) => shape.detach(this.observer));
    this.data.clear();
    this.warehouse.clear();
  }
}
