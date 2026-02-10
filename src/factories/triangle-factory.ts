import { Point } from '../entities/point.js';
import { Triangle } from '../entities/triangle.js';
import { ValidationError } from '../errors/validation-error.js';
import { InputValidator } from '../validators/input-validator.js';
import { ShapeFactory } from './shape-factory.js';

export class TriangleFactory extends ShapeFactory {
  private readonly validator = new InputValidator();

  public createFromLine(id: string, line: string): Triangle {
    if (!this.validator.isValidNumberList(line, 6)) {
      throw new ValidationError(`Invalid triangle row: ${line}`);
    }

    const [x1, y1, x2, y2, x3, y3] = this.validator.parseNumbers(line);

    return new Triangle(id, new Point(x1, y1), new Point(x2, y2), new Point(x3, y3));
  }
}
