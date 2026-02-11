import { ProjectComponent } from "../components/ProjectComponent";
import { ProjectNode } from "../components/ProjectNode";

export class ProjectIterator implements Iterator<ProjectComponent> {
  private readonly stack: ProjectComponent[];

  constructor(root: ProjectComponent) {
    this.stack = [root];
  }

  next(): IteratorResult<ProjectComponent> {
    const current = this.stack.pop();

    if (!current) {
      return { done: true, value: undefined };
    }

    if (current instanceof ProjectNode) {
      const children = [...current.getChildren()].reverse();
      for (const child of children) {
        this.stack.push(child);
      }
    }

    return { done: false, value: current };
  }
}
