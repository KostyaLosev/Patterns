import { Shape, ShapeObserver } from '../entities/shape.js';
import { ShapeMetricsService } from '../services/shape-metrics-service.js';
import { Warehouse } from '../warehouse/warehouse.js';

export class WarehouseObserver implements ShapeObserver {
  private readonly warehouse = Warehouse.getInstance();

  private readonly metricsService = new ShapeMetricsService();

  public onShapeChanged(shape: Shape): void {
    const metrics = this.metricsService.calculate(shape);
    this.warehouse.set(shape.id, metrics);
  }
}
