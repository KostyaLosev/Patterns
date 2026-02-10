import { Point } from '../entities/point.js';
import { Pyramid } from '../entities/pyramid.js';
import { Shape } from '../entities/shape.js';
import { Triangle } from '../entities/triangle.js';
import type { ShapeMetrics } from '../types/metrics.js';
import { firstPoint } from '../utils/shape-utils.js';
import { GeometryService } from './geometry-service.js';
import { PyramidService } from './pyramid-service.js';
import { TriangleService } from './triangle-service.js';

export class ShapeMetricsService {
  private readonly triangleService = new TriangleService();

  private readonly pyramidService = new PyramidService();

  private readonly geometryService = new GeometryService();

  public calculate(shape: Shape): ShapeMetrics {
    const origin = new Point(0, 0, 0);
    const distanceToOrigin = this.geometryService.distance(firstPoint(shape), origin);

    if (shape instanceof Triangle) {
      return {
        area: this.triangleService.area(shape),
        perimeter: this.triangleService.perimeter(shape),
        distanceToOrigin,
      };
    }

    if (shape instanceof Pyramid) {
      return {
        volume: this.pyramidService.volume(shape),
        surfaceArea: this.pyramidService.surfaceArea(shape),
        distanceToOrigin,
      };
    }

    throw new Error(`Unsupported shape type: ${shape.type}`);
  }
}
