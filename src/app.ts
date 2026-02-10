import { Pyramid } from './entities/pyramid.js';
import { Triangle } from './entities/triangle.js';
import { TriangleFactory } from './factories/triangle-factory.js';
import { PyramidFactory } from './factories/pyramid-factory.js';
import { FileReader } from './io/file-reader.js';
import { logger } from './io/logger.js';
import { PyramidService } from './services/pyramid-service.js';
import { TriangleService } from './services/triangle-service.js';
import { PyramidValidator } from './validators/pyramid-validator.js';
import { TriangleValidator } from './validators/triangle-validator.js';

const fileReader = new FileReader();
const triangleFactory = new TriangleFactory();
const pyramidFactory = new PyramidFactory();
const triangleService = new TriangleService();
const pyramidService = new PyramidService();
const triangleValidator = new TriangleValidator();
const pyramidValidator = new PyramidValidator();

const loadTriangles = (file: string): Triangle[] => {
  const lines = fileReader.readLines(file);

  return lines.flatMap((line, index) => {
    try {
      const triangle = triangleFactory.createFromLine(`triangle-${index + 1}`, line);
      if (!triangleValidator.isTriangle(triangle)) {
        logger.warn({ line }, 'Invalid triangle by geometry definition, skipped');
        return [];
      }

      return [triangle];
    } catch (error) {
      logger.warn({ line }, 'Invalid triangle row, skipped');
      return [];
    }
  });
};

const loadPyramids = (file: string): Pyramid[] => {
  const lines = fileReader.readLines(file);

  return lines.flatMap((line, index) => {
    try {
      const pyramid = pyramidFactory.createFromLine(`pyramid-${index + 1}`, line);
      if (!pyramidValidator.isPyramid(pyramid)) {
        logger.warn({ line }, 'Invalid pyramid by geometry definition, skipped');
        return [];
      }

      return [pyramid];
    } catch (error) {
      logger.warn({ line }, 'Invalid pyramid row, skipped');
      return [];
    }
  });
};

const triangles = loadTriangles('src/data/triangles.txt');
const pyramids = loadPyramids('src/data/pyramids.txt');

triangles.forEach((triangle) => {
  logger.info({
    id: triangle.id,
    perimeter: triangleService.perimeter(triangle),
    area: triangleService.area(triangle),
    right: triangleService.isRight(triangle),
    isosceles: triangleService.isIsosceles(triangle),
    equilateral: triangleService.isEquilateral(triangle),
    angleType: triangleService.angleType(triangle),
  }, 'Triangle metrics');
});

pyramids.forEach((pyramid) => {
  logger.info({
    id: pyramid.id,
    surfaceArea: pyramidService.surfaceArea(pyramid),
    volume: pyramidService.volume(pyramid),
    baseOnPlane: pyramidValidator.isBaseOnCoordinatePlane(pyramid),
    ratioXY: pyramidService.volumeRatioByPlane(pyramid, 'XY'),
  }, 'Pyramid metrics');
});
