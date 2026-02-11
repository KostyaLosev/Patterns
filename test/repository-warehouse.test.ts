import {
  ShapeByDistanceToOriginRangeSpecification,
  ShapeByFirstPointQuadrantSpecification,
  ShapeByIdSpecification,
  ShapeByMetricRangeSpecification,
  ShapeByNameSpecification,
} from '../src/specifications/shape-specifications.js';
import {
  ShapeByFirstPointXComparator,
  ShapeByFirstPointYComparator,
  ShapeByIdComparator,
  ShapeByNameComparator,
} from '../src/comparators/shape-comparators.js';
import { Point } from '../src/entities/point.js';
import { Pyramid } from '../src/entities/pyramid.js';
import { Triangle } from '../src/entities/triangle.js';
import { ShapeRepository } from '../src/repository/shape-repository.js';
import { Warehouse } from '../src/warehouse/warehouse.js';

describe('Repository, specifications and warehouse', () => {
  const warehouse = Warehouse.getInstance();

  beforeEach(() => {
    warehouse.clear();
  });

  it('stores and searches shapes by id and name', () => {
    const repository = new ShapeRepository();
    const triangle = new Triangle('t-10', new Point(1, 1), new Point(4, 1), new Point(1, 5), 'MyTriangle');
    const pyramid = new Pyramid('p-20', new Point(1, 1, 1), new Point(2, 1, 1), new Point(1, 2, 1), new Point(1, 1, 2), 'MyPyramid');

    repository.add(triangle);
    repository.add(pyramid);

    expect(repository.find(new ShapeByIdSpecification('t-10'))).toEqual([triangle]);
    expect(repository.find(new ShapeByNameSpecification('pyr'))).toEqual([pyramid]);
  });

  it('filters by first quadrant and metric ranges from warehouse', () => {
    const repository = new ShapeRepository();
    const triangle = new Triangle('t-1', new Point(1, 1), new Point(4, 1), new Point(1, 5), 'TriangleA');
    const pyramid = new Pyramid('p-1', new Point(-1, 1, 1), new Point(0, 1, 1), new Point(-1, 2, 1), new Point(-1, 1, 2), 'PyramidA');

    repository.add(triangle);
    repository.add(pyramid);

    const firstQuadrant = repository.find(new ShapeByFirstPointQuadrantSpecification());
    expect(firstQuadrant).toEqual([triangle]);

    const perimeterShapes = repository.find(new ShapeByMetricRangeSpecification('perimeter', 10, 20));
    expect(perimeterShapes).toEqual([triangle]);

    const byDistance = repository.find(new ShapeByDistanceToOriginRangeSpecification(1, 2));
    expect(byDistance).toEqual([triangle]);
  });

  it('sorts shapes with comparators', () => {
    const repository = new ShapeRepository();
    const t2 = new Triangle('t-2', new Point(3, 1), new Point(4, 1), new Point(3, 2), 'Beta');
    const t1 = new Triangle('t-1', new Point(1, 5), new Point(2, 5), new Point(1, 6), 'Alpha');

    repository.add(t2);
    repository.add(t1);

    expect(repository.sort(new ShapeByIdComparator()).map((shape) => shape.id)).toEqual(['t-1', 't-2']);
    expect(repository.sort(new ShapeByNameComparator()).map((shape) => shape.name)).toEqual(['Alpha', 'Beta']);
    expect(repository.sort(new ShapeByFirstPointXComparator()).map((shape) => shape.id)).toEqual(['t-1', 't-2']);
    expect(repository.sort(new ShapeByFirstPointYComparator()).map((shape) => shape.id)).toEqual(['t-2', 't-1']);
  });

  it('recalculates warehouse values when observed shape changes', () => {
    const repository = new ShapeRepository();
    const triangle = new Triangle('t-7', new Point(0, 0), new Point(3, 0), new Point(0, 4), 'Observed');

    repository.add(triangle);
    const initialPerimeter = warehouse.get('t-7')?.perimeter;

    triangle.updateB(new Point(6, 0));

    const updatedPerimeter = warehouse.get('t-7')?.perimeter;
    expect(initialPerimeter).toBeCloseTo(12, 5);
    expect(updatedPerimeter).toBeCloseTo(18, 5);

    expect(repository.removeById('t-7')).toBe(true);
    expect(warehouse.get('t-7')).toBeUndefined();
  });
});
