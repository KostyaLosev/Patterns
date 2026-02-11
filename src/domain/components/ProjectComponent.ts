export interface ProjectComponent {
  readonly name: string;
  getEstimatedHours(): number;
  getEstimatedBudget(): number;
  print(indent?: number): string;
}
