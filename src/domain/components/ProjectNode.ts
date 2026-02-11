import { ProjectComponent } from "./ProjectComponent";

export class ProjectNode implements ProjectComponent {
  private readonly children: ProjectComponent[] = [];

  constructor(public readonly name: string) {}

  add(component: ProjectComponent): void {
    this.children.push(component);
  }

  getChildren(): readonly ProjectComponent[] {
    return this.children;
  }

  getEstimatedHours(): number {
    return this.children.reduce((sum, child) => sum + child.getEstimatedHours(), 0);
  }

  getEstimatedBudget(): number {
    return this.children.reduce((sum, child) => sum + child.getEstimatedBudget(), 0);
  }

  print(indent: number = 0): string {
    const header = `${" ".repeat(indent)}+ ProjectNode: ${this.name}`;
    const body = this.children.map((child) => child.print(indent + 2));
    return [header, ...body].join("\n");
  }
}
