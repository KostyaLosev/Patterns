import { Command } from "../domain/command";
import { FileService } from "../domain/file-service";

export class ReadFileCommand implements Command<string> {
  constructor(
    private readonly fileService: FileService,
    private readonly filePath: string
  ) {}

  execute(): Promise<string> {
    return this.fileService.read(this.filePath);
  }
}
