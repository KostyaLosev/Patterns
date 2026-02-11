import { promises as fs } from "fs";
import path from "path";
import { FileService } from "../domain/file-service";

export class RealFileService implements FileService {
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
