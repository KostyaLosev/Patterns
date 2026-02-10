import { Shape } from '../entities/shape.js';

export abstract class ShapeFactory {
  public abstract createFromLine(id: string, line: string): Shape;
}
