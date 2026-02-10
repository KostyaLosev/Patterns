import { Point } from '../src/entities/point.js';
import { Triangle } from '../src/entities/triangle.js';
import { TriangleService } from '../src/services/triangle-service.js';
import { TriangleValidator } from '../src/validators/triangle-validator.js';
describe('Triangle domain', () => {
    const service = new TriangleService();
    const validator = new TriangleValidator();
    it('calculates area and perimeter for 3-4-5 triangle', () => {
        const triangle = new Triangle('t1', new Point(0, 0), new Point(3, 0), new Point(0, 4));
        expect(validator.isTriangle(triangle)).toBe(true);
        expect(service.perimeter(triangle)).toBeCloseTo(12, 5);
        expect(service.area(triangle)).toBeCloseTo(6, 5);
    });
    it('classifies triangle kinds correctly', () => {
        const triangle = new Triangle('t2', new Point(0, 0), new Point(2, 0), new Point(1, Math.sqrt(3)));
        expect(service.isEquilateral(triangle)).toBe(true);
        expect(service.isIsosceles(triangle)).toBe(true);
        expect(service.angleType(triangle)).toEqual('acute');
    });
    it('detects non-triangle for collinear points', () => {
        const collinear = new Triangle('t3', new Point(0, 0), new Point(1, 1), new Point(2, 2));
        expect(validator.isTriangle(collinear)).toBeFalsy();
        expect(service.area(collinear)).toEqual(0);
    });
    it('checks axis intersection rule', () => {
        const triangle = new Triangle('t4', new Point(5, 0, 0), new Point(1, 2, 0), new Point(2, 1, 0));
        expect(service.intersectsOnlyOneAxisAtDistance(triangle, 4)).toBeTruthy();
        expect(service.intersectsOnlyOneAxisAtDistance(triangle, 6)).toBe(false);
    });
});
