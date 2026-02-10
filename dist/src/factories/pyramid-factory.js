import { Point } from '../entities/point.js';
import { Pyramid } from '../entities/pyramid.js';
import { ValidationError } from '../errors/validation-error.js';
import { InputValidator } from '../validators/input-validator.js';
import { ShapeFactory } from './shape-factory.js';
export class PyramidFactory extends ShapeFactory {
    validator = new InputValidator();
    createFromLine(id, line) {
        if (!this.validator.isValidNumberList(line, 12)) {
            throw new ValidationError(`Invalid pyramid row: ${line}`);
        }
        const values = this.validator.parseNumbers(line);
        return new Pyramid(id, new Point(values[0], values[1], values[2]), new Point(values[3], values[4], values[5]), new Point(values[6], values[7], values[8]), new Point(values[9], values[10], values[11]));
    }
}
