import { ProjectComponent } from "../components/ProjectComponent";
import { ProjectIterator } from "./ProjectIterator";

export class ProjectTraversal implements Iterable<ProjectComponent> {
  constructor(private readonly root: ProjectComponent) {}

  [Symbol.iterator](): Iterator<ProjectComponent> {
    return new ProjectIterator(this.root);
  }
}
