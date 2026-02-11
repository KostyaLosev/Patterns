export interface FileService {
  read(filePath: string): Promise<string>;
  write(filePath: string, content: string): Promise<void>;
  delete(filePath: string): Promise<void>;
}
