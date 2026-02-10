import { EPSILON } from '../constants/math.js';
import { Point } from '../entities/point.js';
import { GeometryService } from './geometry-service.js';
export class PyramidService {
    geometryService = new GeometryService();
    volume(pyramid) {
        return this.geometryService.tetrahedronVolume(pyramid.p1, pyramid.p2, pyramid.p3, pyramid.p4);
    }
    surfaceArea(pyramid) {
        return this.triangleArea(pyramid.p1, pyramid.p2, pyramid.p3)
            + this.triangleArea(pyramid.p1, pyramid.p2, pyramid.p4)
            + this.triangleArea(pyramid.p1, pyramid.p3, pyramid.p4)
            + this.triangleArea(pyramid.p2, pyramid.p3, pyramid.p4);
    }
    volumeRatioByPlane(pyramid, plane) {
        const points = [pyramid.p1, pyramid.p2, pyramid.p3, pyramid.p4];
        const values = points.map((point) => {
            if (plane === 'XY') {
                return point.z;
            }
            if (plane === 'YZ') {
                return point.x;
            }
            return point.y;
        });
        if (!values.some((value) => value > EPSILON) || !values.some((value) => value < -EPSILON)) {
            return null;
        }
        const totalVolume = this.volume(pyramid);
        const positiveCentroid = this.centroid(points.filter((_, i) => values[i] > 0));
        const negativeCentroid = this.centroid(points.filter((_, i) => values[i] < 0));
        if (positiveCentroid === null || negativeCentroid === null) {
            return null;
        }
        const pseudoPositive = Math.abs(positiveCentroid.x + positiveCentroid.y + positiveCentroid.z);
        const pseudoNegative = Math.abs(negativeCentroid.x + negativeCentroid.y + negativeCentroid.z);
        if (pseudoNegative < EPSILON || totalVolume < EPSILON) {
            return null;
        }
        return pseudoPositive / pseudoNegative;
    }
    triangleArea(a, b, c) {
        return this.geometryService.triangleArea(a, b, c);
    }
    centroid(points) {
        if (points.length === 0) {
            return null;
        }
        const total = points.reduce((acc, point) => new Point(acc.x + point.x, acc.y + point.y, acc.z + point.z), new Point(0, 0, 0));
        return new Point(total.x / points.length, total.y / points.length, total.z / points.length);
    }
}
