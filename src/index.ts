import { createSampleProject } from "./app/createSampleProject";

const project = createSampleProject();

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
