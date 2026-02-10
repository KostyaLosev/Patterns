import type { ShapeType } from '../types/shape.js';

export interface ShapeObserver {
  onShapeChanged(shape: Shape): void;
}

export abstract class Shape {
  public readonly id: string;

  public readonly type: ShapeType;

  public readonly name: string;

  private readonly observers = new Set<ShapeObserver>();

  protected constructor(id: string, type: ShapeType, name?: string) {
    this.id = id;
    this.type = type;
    this.name = name ?? id;
  }

  public attach(observer: ShapeObserver): void {
    this.observers.add(observer);
  }

  public detach(observer: ShapeObserver): void {
    this.observers.delete(observer);
  }

  protected notifyChanged(): void {
    this.observers.forEach((observer) => observer.onShapeChanged(this));
  }
}
