import { EPSILON } from '../constants/math.js';
import { Point } from '../entities/point.js';
export class GeometryService {
    distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) ** 2
            + (p1.y - p2.y) ** 2
            + (p1.z - p2.z) ** 2);
    }
    triangleArea(a, b, c) {
        const ab = this.vector(a, b);
        const ac = this.vector(a, c);
        const cross = this.cross(ab, ac);
        return 0.5 * Math.sqrt(cross.x ** 2 + cross.y ** 2 + cross.z ** 2);
    }
    areCollinear(a, b, c) {
        return this.triangleArea(a, b, c) < EPSILON;
    }
    dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    vector(p1, p2) {
        return new Point(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z);
    }
    cross(v1, v2) {
        return new Point(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
    }
    tetrahedronVolume(a, b, c, d) {
        const ab = this.vector(a, b);
        const ac = this.vector(a, c);
        const ad = this.vector(a, d);
        const cross = this.cross(ac, ad);
        return Math.abs(this.dot(ab, cross)) / 6;
    }
}
