import { promises as fs } from "fs";
import path from "path";

type FileAction = "read" | "write" | "delete";

interface FileService {
  read(filePath: string): Promise<string>;
  write(filePath: string, content: string): Promise<void>;
  delete(filePath: string): Promise<void>;
}

class RealFileService implements FileService {
  constructor(private readonly rootDir: string) {}

  private resolveSafePath(filePath: string): string {
    const fullPath = path.resolve(this.rootDir, filePath);

    if (!fullPath.startsWith(this.rootDir)) {
      throw new Error(`Path traversal detected: ${filePath}`);
    }

    return fullPath;
  }

  async read(filePath: string): Promise<string> {
    const target = this.resolveSafePath(filePath);
    return fs.readFile(target, "utf-8");
  }

  async write(filePath: string, content: string): Promise<void> {
    const target = this.resolveSafePath(filePath);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content, "utf-8");
  }

  async delete(filePath: string): Promise<void> {
    const target = this.resolveSafePath(filePath);
    await fs.rm(target, { force: true });
  }
}

type AccessPolicy = {
  [userId: string]: FileAction[];
};

class AccessProxyFileService implements FileService {
  constructor(
    private readonly userId: string,
    private readonly policy: AccessPolicy,
    private readonly realService: FileService
  ) {}

  private ensureAccess(action: FileAction, filePath: string): void {
    const allowedActions = this.policy[this.userId] ?? [];

    if (!allowedActions.includes(action)) {
      throw new Error(
        `Access denied. User "${this.userId}" cannot ${action} file: ${filePath}`
      );
    }
  }

  async read(filePath: string): Promise<string> {
    this.ensureAccess("read", filePath);
    return this.realService.read(filePath);
  }

  async write(filePath: string, content: string): Promise<void> {
    this.ensureAccess("write", filePath);
    await this.realService.write(filePath, content);
  }

  async delete(filePath: string): Promise<void> {
    this.ensureAccess("delete", filePath);
    await this.realService.delete(filePath);
  }
}

interface Command<T = void> {
  execute(): Promise<T>;
}

class ReadFileCommand implements Command<string> {
  constructor(
    private readonly fileService: FileService,
    private readonly filePath: string
  ) {}

  execute(): Promise<string> {
    return this.fileService.read(this.filePath);
  }
}

class WriteFileCommand implements Command<void> {
  constructor(
    private readonly fileService: FileService,
    private readonly filePath: string,
    private readonly content: string
  ) {}

  execute(): Promise<void> {
    return this.fileService.write(this.filePath, this.content);
  }
}

class DeleteFileCommand implements Command<void> {
  constructor(
    private readonly fileService: FileService,
    private readonly filePath: string
  ) {}

  execute(): Promise<void> {
    return this.fileService.delete(this.filePath);
  }
}

class FileCommandInvoker {
  async run<T>(command: Command<T>): Promise<T> {
    return command.execute();
  }
}

async function demo(): Promise<void> {
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

demo().catch((error) => {
  console.error("Unexpected error:", error);
  process.exitCode = 1;
});
