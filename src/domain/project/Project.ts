import { ProjectComponent } from "../components/ProjectComponent";
import { ProjectNode } from "../components/ProjectNode";
import { ProjectTraversal } from "../iterator/ProjectTraversal";

export class Project {
  constructor(
    public readonly title: string,
    public readonly owner: string,
    private readonly root: ProjectNode
  ) {}

  getStructure(): ProjectNode {
    return this.root;
  }

  getEstimatedHours(): number {
    return this.root.getEstimatedHours();
  }

  getEstimatedBudget(): number {
    return this.root.getEstimatedBudget();
  }

  printStructure(): string {
    return this.root.print();
  }

  traverse(): Iterable<ProjectComponent> {
    return new ProjectTraversal(this.root);
  }
}
