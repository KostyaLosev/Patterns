import { EPSILON } from '../constants/math.js';
import { GeometryService } from './geometry-service.js';
export class TriangleService {
    geometryService = new GeometryService();
    perimeter(triangle) {
        const ab = this.geometryService.distance(triangle.a, triangle.b);
        const bc = this.geometryService.distance(triangle.b, triangle.c);
        const ac = this.geometryService.distance(triangle.a, triangle.c);
        return ab + bc + ac;
    }
    area(triangle) {
        return this.geometryService.triangleArea(triangle.a, triangle.b, triangle.c);
    }
    isRight(triangle) {
        const [l1, l2, l3] = this.sidesSorted(triangle);
        return Math.abs(l1 ** 2 + l2 ** 2 - l3 ** 2) < EPSILON;
    }
    isIsosceles(triangle) {
        const [ab, bc, ac] = this.sidesSorted(triangle);
        return Math.abs(ab - bc) < EPSILON || Math.abs(bc - ac) < EPSILON;
    }
    isEquilateral(triangle) {
        const [ab, bc, ac] = this.sidesSorted(triangle);
        return Math.abs(ab - bc) < EPSILON && Math.abs(bc - ac) < EPSILON;
    }
    angleType(triangle) {
        const [l1, l2, l3] = this.sidesSorted(triangle);
        const value = l1 ** 2 + l2 ** 2 - l3 ** 2;
        if (Math.abs(value) < EPSILON) {
            return 'right';
        }
        if (value > 0) {
            return 'acute';
        }
        return 'obtuse';
    }
    intersectsOnlyOneAxisAtDistance(triangle, distance) {
        const points = [triangle.a, triangle.b, triangle.c];
        const intersectsX = points.some((p) => Math.abs(p.y) < EPSILON && Math.abs(p.z) < EPSILON && Math.abs(p.x) >= distance);
        const intersectsY = points.some((p) => Math.abs(p.x) < EPSILON && Math.abs(p.z) < EPSILON && Math.abs(p.y) >= distance);
        const intersectsZ = points.some((p) => Math.abs(p.x) < EPSILON && Math.abs(p.y) < EPSILON && Math.abs(p.z) >= distance);
        const count = [intersectsX, intersectsY, intersectsZ].filter(Boolean).length;
        return count === 1;
    }
    sidesSorted(triangle) {
        const sides = [
            this.geometryService.distance(triangle.a, triangle.b),
            this.geometryService.distance(triangle.b, triangle.c),
            this.geometryService.distance(triangle.a, triangle.c),
        ].sort((a, b) => a - b);
        return [sides[0], sides[1], sides[2]];
    }
}
