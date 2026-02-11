import { ProjectBuilder } from "../domain/builder/ProjectBuilder";
import { Project } from "../domain/project/Project";

export function createSampleProject(): Project {
  return new ProjectBuilder()
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
}
