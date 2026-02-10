import { EPSILON } from '../constants/math.js';
import { Pyramid } from '../entities/pyramid.js';
import { GeometryService } from '../services/geometry-service.js';

export class PyramidValidator {
  private readonly geometryService = new GeometryService();

  public isPyramid(pyramid: Pyramid): boolean {
    return this.geometryService.tetrahedronVolume(
      pyramid.p1,
      pyramid.p2,
      pyramid.p3,
      pyramid.p4,
    ) > EPSILON;
  }

  public isBaseOnCoordinatePlane(pyramid: Pyramid): boolean {
    const faces = [
      [pyramid.p1, pyramid.p2, pyramid.p3],
      [pyramid.p1, pyramid.p2, pyramid.p4],
      [pyramid.p1, pyramid.p3, pyramid.p4],
      [pyramid.p2, pyramid.p3, pyramid.p4],
    ];

    return faces.some((face) => {
      const xPlane = face.every((point) => Math.abs(point.x) < EPSILON);
      const yPlane = face.every((point) => Math.abs(point.y) < EPSILON);
      const zPlane = face.every((point) => Math.abs(point.z) < EPSILON);

      return xPlane || yPlane || zPlane;
    });
  }
}
