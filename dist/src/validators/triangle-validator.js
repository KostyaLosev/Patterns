import { GeometryService } from '../services/geometry-service.js';
export class TriangleValidator {
    geometryService = new GeometryService();
    isTriangle(triangle) {
        return !this.geometryService.areCollinear(triangle.a, triangle.b, triangle.c);
    }
}
