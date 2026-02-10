import { AppError } from './app-error.js';

export class ValidationError extends AppError {
  public constructor(message: string) {
    super('VALIDATION_ERROR', message);
    this.name = 'ValidationError';
  }
}
