import { Point } from '../src/entities/point.js';
import { Pyramid } from '../src/entities/pyramid.js';
import { PyramidService } from '../src/services/pyramid-service.js';
import { PyramidValidator } from '../src/validators/pyramid-validator.js';

describe('Pyramid domain', () => {
  const service = new PyramidService();
  const validator = new PyramidValidator();

  it('calculates volume and surface area', () => {
    const pyramid = new Pyramid('p1', new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0), new Point(0, 0, 1));

    expect(validator.isPyramid(pyramid)).toBe(true);
    expect(service.volume(pyramid)).toBeCloseTo(1 / 6, 5);
    expect(service.surfaceArea(pyramid)).toBeGreaterThan(2);
  });

  it('checks base located on coordinate plane', () => {
    const pyramid = new Pyramid('p2', new Point(0, 0, 0), new Point(2, 0, 0), new Point(0, 2, 0), new Point(0, 0, 3));

    expect(validator.isBaseOnCoordinatePlane(pyramid)).toEqual(true);
    expect(service.volumeRatioByPlane(pyramid, 'XY')).toBeNull();
  });

  it('detects invalid pyramid with coplanar points', () => {
    const pyramid = new Pyramid('p3', new Point(0, 0, 0), new Point(1, 0, 0), new Point(0, 1, 0), new Point(2, 2, 0));

    expect(validator.isPyramid(pyramid)).toBe(false);
    expect(service.volume(pyramid)).toBe(0);
  });
});
