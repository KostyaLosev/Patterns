import { AccessPolicy } from "../domain/access-policy";
import { FileAction } from "../domain/file-action";
import { FileService } from "../domain/file-service";

export class AccessProxyFileService implements FileService {
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
