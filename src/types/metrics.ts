export interface ShapeMetrics {
  area?: number;
  perimeter?: number;
  volume?: number;
  surfaceArea?: number;
  distanceToOrigin: number;
}

export type MetricName = 'area' | 'perimeter' | 'volume' | 'surfaceArea' | 'distanceToOrigin';
