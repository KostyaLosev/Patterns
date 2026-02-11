import { Command } from "../domain/command";

export class FileCommandInvoker {
  async run<T>(command: Command<T>): Promise<T> {
    return command.execute();
  }
}
