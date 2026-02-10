import { AppError } from './app-error.js';
export class ValidationError extends AppError {
    constructor(message) {
        super('VALIDATION_ERROR', message);
        this.name = 'ValidationError';
    }
}
