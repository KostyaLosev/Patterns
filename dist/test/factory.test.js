import { PyramidFactory } from '../src/factories/pyramid-factory.js';
import { TriangleFactory } from '../src/factories/triangle-factory.js';
describe('Factories and parsing', () => {
    it('creates triangle from valid line', () => {
        const factory = new TriangleFactory();
        const triangle = factory.createFromLine('t', '0 0 3 0 0 4');
        expect(triangle.id).toContain('t');
        expect(triangle.a.x).toBe(0);
        expect(triangle.c.y).toBe(4);
    });
    it('throws for invalid triangle line', () => {
        const factory = new TriangleFactory();
        expect(() => factory.createFromLine('bad', '0 a 3 0 0 4')).toThrow();
        expect(() => factory.createFromLine('bad', '0 a 3 0 0 4')).toThrow('Invalid triangle row');
    });
    it('creates pyramid from valid line', () => {
        const factory = new PyramidFactory();
        const pyramid = factory.createFromLine('p', '0 0 0 1 0 0 0 1 0 0 0 1');
        expect(pyramid.id).toEqual('p');
        expect(pyramid.p4.z).toEqual(1);
    });
});
