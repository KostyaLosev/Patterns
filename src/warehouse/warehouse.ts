import { ShapeMetrics } from '../types/metrics.js';

export class Warehouse {
  private static instance: Warehouse;

  private readonly values = new Map<string, ShapeMetrics>();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }

    return Warehouse.instance;
  }

  public set(shapeId: string, metrics: ShapeMetrics): void {
    this.values.set(shapeId, metrics);
  }

  public get(shapeId: string): ShapeMetrics | undefined {
    return this.values.get(shapeId);
  }

  public delete(shapeId: string): boolean {
    return this.values.delete(shapeId);
  }

  public clear(): void {
    this.values.clear();
  }
}
