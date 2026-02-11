import { runDemo } from "./app/demo";

runDemo().catch((error) => {
  console.error("Unexpected error:", error);
  process.exitCode = 1;
});
