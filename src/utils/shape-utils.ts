import { Point } from '../entities/point.js';
import { Pyramid } from '../entities/pyramid.js';
import { Shape } from '../entities/shape.js';
import { Triangle } from '../entities/triangle.js';

export const firstPoint = (shape: Shape): Point => {
  if (shape instanceof Triangle) {
    return shape.a;
  }

  if (shape instanceof Pyramid) {
    return shape.p1;
  }

  throw new Error(`Unsupported shape type: ${shape.type}`);
};
