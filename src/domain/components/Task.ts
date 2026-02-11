import { ProjectComponent } from "./ProjectComponent";

export class Task implements ProjectComponent {
  constructor(
    public readonly name: string,
    private readonly estimatedHours: number,
    private readonly estimatedBudget: number
  ) {}

  getEstimatedHours(): number {
    return this.estimatedHours;
  }

  getEstimatedBudget(): number {
    return this.estimatedBudget;
  }

  print(indent: number = 0): string {
    return `${" ".repeat(indent)}- Task: ${this.name} (${this.estimatedHours}h, $${this.estimatedBudget})`;
  }
}
