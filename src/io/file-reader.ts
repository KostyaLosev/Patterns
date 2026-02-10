import fs from 'node:fs';
import path from 'node:path';
import { AppError } from '../errors/app-error.js';

export class FileReader {
  public readLines(relativePath: string): string[] {
    const fullPath = path.resolve(relativePath);

    try {
      const content = fs.readFileSync(fullPath, 'utf-8');

      return content.split(/\r?\n/).filter((line) => line.trim().length > 0);
    } catch (error) {
      throw new AppError('FILE_READ_ERROR', `Failed to read file: ${relativePath}`);
    }
  }
}
