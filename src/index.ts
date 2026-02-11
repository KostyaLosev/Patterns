interface ProjectComponent {
  readonly name: string;
  getEstimatedHours(): number;
  getEstimatedBudget(): number;
  print(indent?: number): string;
}

class Task implements ProjectComponent {
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

class ProjectNode implements ProjectComponent {
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

class ProjectIterator implements Iterator<ProjectComponent> {
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

class ProjectTraversal implements Iterable<ProjectComponent> {
  constructor(private readonly root: ProjectComponent) {}

  [Symbol.iterator](): Iterator<ProjectComponent> {
    return new ProjectIterator(this.root);
  }
}

class Project {
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

class ProjectBuilder {
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

const project = new ProjectBuilder()
  .setTitle("E-commerce Platform")
  .setOwner("Digital Team")
  .startWithRoot("E-commerce Platform")
  .addGroup([], "Analysis")
  .addTask(["Analysis"], "Collect requirements", 24, 3000)
  .addTask(["Analysis"], "Create roadmap", 16, 1800)
  .addGroup([], "Development")
  .addGroup(["Development"], "Frontend")
  .addTask(["Development", "Frontend"], "Build UI components", 60, 7000)
  .addTask(["Development", "Frontend"], "Integrate checkout", 40, 5000)
  .addGroup(["Development"], "Backend")
  .addTask(["Development", "Backend"], "Design database schema", 32, 4000)
  .addTask(["Development", "Backend"], "Implement APIs", 72, 9000)
  .addGroup([], "QA")
  .addTask(["QA"], "Functional testing", 36, 3500)
  .addTask(["QA"], "Performance testing", 20, 2400)
  .build();

console.log(`Project: ${project.title}`);
console.log(`Owner: ${project.owner}`);
console.log(`Total estimated hours: ${project.getEstimatedHours()}`);
console.log(`Total estimated budget: $${project.getEstimatedBudget()}`);
console.log("\nProject structure:");
console.log(project.printStructure());

console.log("\nTraversal order (Iterator):");
for (const component of project.traverse()) {
  console.log(`• ${component.name}`);
}
