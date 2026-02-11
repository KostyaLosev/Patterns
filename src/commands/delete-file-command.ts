import { Command } from "../domain/command";
import { FileService } from "../domain/file-service";

export class DeleteFileCommand implements Command<void> {
  constructor(
    private readonly fileService: FileService,
    private readonly filePath: string
  ) {}

  execute(): Promise<void> {
    return this.fileService.delete(this.filePath);
  }
}
