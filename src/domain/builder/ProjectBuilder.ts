import { ProjectNode } from "../components/ProjectNode";
import { Task } from "../components/Task";
import { Project } from "../project/Project";

export class ProjectBuilder {
  private title: string = "Untitled project";
  private owner: string = "Unknown owner";
  private root: ProjectNode = new ProjectNode("Root");

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setOwner(owner: string): this {
    this.owner = owner;
    return this;
  }

  startWithRoot(name: string): this {
    this.root = new ProjectNode(name);
    return this;
  }

  addTask(path: string[], taskName: string, hours: number, budget: number): this {
    const parent = this.resolveOrCreatePath(path);
    parent.add(new Task(taskName, hours, budget));
    return this;
  }

  addGroup(path: string[], groupName: string): this {
    const parent = this.resolveOrCreatePath(path);
    parent.add(new ProjectNode(groupName));
    return this;
  }

  build(): Project {
    const project = new Project(this.title, this.owner, this.root);
    this.reset();
    return project;
  }

  private reset(): void {
    this.title = "Untitled project";
    this.owner = "Unknown owner";
    this.root = new ProjectNode("Root");
  }

  private resolveOrCreatePath(path: string[]): ProjectNode {
    let current = this.root;

    for (const segment of path) {
      const existing = current
        .getChildren()
        .find((child): child is ProjectNode => child instanceof ProjectNode && child.name === segment);

      if (existing) {
        current = existing;
      } else {
        const created = new ProjectNode(segment);
        current.add(created);
        current = created;
      }
    }

    return current;
  }
}
