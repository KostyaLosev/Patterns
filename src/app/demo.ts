import path from "path";
import { ReadFileCommand } from "../commands/read-file-command";
import { WriteFileCommand } from "../commands/write-file-command";
import { DeleteFileCommand } from "../commands/delete-file-command";
import { AccessPolicy } from "../domain/access-policy";
import { FileCommandInvoker } from "../invoker/file-command-invoker";
import { AccessProxyFileService } from "../proxy/access-proxy-file-service";
import { RealFileService } from "../services/real-file-service";

export async function runDemo(): Promise<void> {
  const storageRoot = path.resolve(process.cwd(), "storage");

  const policy: AccessPolicy = {
    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"]
  };

  const realService = new RealFileService(storageRoot);
  const adminService = new AccessProxyFileService("admin", policy, realService);
  const viewerService = new AccessProxyFileService("viewer", policy, realService);

  const invoker = new FileCommandInvoker();

  await invoker.run(
    new WriteFileCommand(adminService, "docs/hello.txt", "Proxy + Command in TS")
  );

  const fileContent = await invoker.run(
    new ReadFileCommand(viewerService, "docs/hello.txt")
  );
  console.log("Read by viewer:", fileContent);

  try {
    await invoker.run(new DeleteFileCommand(viewerService, "docs/hello.txt"));
  } catch (error) {
    console.error("Viewer delete error:", (error as Error).message);
  }

  await invoker.run(new DeleteFileCommand(adminService, "docs/hello.txt"));
  console.log("File deleted by admin");
}
