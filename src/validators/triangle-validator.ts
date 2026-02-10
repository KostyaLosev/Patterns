import { Triangle } from '../entities/triangle.js';
import { GeometryService } from '../services/geometry-service.js';

export class TriangleValidator {
  private readonly geometryService = new GeometryService();

  public isTriangle(triangle: Triangle): boolean {
    return !this.geometryService.areCollinear(triangle.a, triangle.b, triangle.c);
  }
}
