import { Pyramid } from './entities/pyramid.js';
import { Triangle } from './entities/triangle.js';
import { PyramidFactory } from './factories/pyramid-factory.js';
import { TriangleFactory } from './factories/triangle-factory.js';
import { FileReader } from './io/file-reader.js';
import { logger } from './io/logger.js';
import { ShapeRepository } from './repository/shape-repository.js';
import { ShapeByFirstPointQuadrantSpecification } from './specifications/shape-specifications.js';
import { PyramidValidator } from './validators/pyramid-validator.js';
import { TriangleValidator } from './validators/triangle-validator.js';
import { Warehouse } from './warehouse/warehouse.js';

const fileReader = new FileReader();
const triangleFactory = new TriangleFactory();
const pyramidFactory = new PyramidFactory();
const triangleValidator = new TriangleValidator();
const pyramidValidator = new PyramidValidator();
const repository = new ShapeRepository();
const warehouse = Warehouse.getInstance();

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

[...loadTriangles('src/data/triangles.txt'), ...loadPyramids('src/data/pyramids.txt')]
  .forEach((shape) => repository.add(shape));

repository.getAll().forEach((shape) => {
  logger.info({
    id: shape.id,
    name: shape.name,
    type: shape.type,
    metrics: warehouse.get(shape.id),
  }, 'Shape stored in repository');
});

const inFirstQuadrant = repository.find(new ShapeByFirstPointQuadrantSpecification());
logger.info({ count: inFirstQuadrant.length }, 'Shapes with first point in first quadrant');
