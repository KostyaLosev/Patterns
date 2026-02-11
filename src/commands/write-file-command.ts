import { Command } from "../domain/command";
import { FileService } from "../domain/file-service";

export class WriteFileCommand implements Command<void> {
  constructor(
    private readonly fileService: FileService,
    private readonly filePath: string,
    private readonly content: string
  ) {}

  execute(): Promise<void> {
    return this.fileService.write(this.filePath, this.content);
  }
}
