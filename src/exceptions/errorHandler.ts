import { Response } from 'express';

import { AppError, HttpCode } from './appError';

class ErrorHandler {
    public handleError(error: Error | AppError, response?: Response): void {
        if (this.isTrustedError(error) && response) {
            this.handleTrustedError(error as AppError, response);
        } else {
            this.handleUntrustedError(error, response);
        }
    }

    public isTrustedError(error: Error): boolean {
        if (error instanceof AppError) {
            return error.isOperational;
        }

        return false;
    }

    private handleTrustedError(error: AppError, response: Response): void {
        if (error.validation.length > 0) {
            response.status(error.httpCode).json({ message: error.message, validations: error.validation });
        }
        response.status(error.httpCode).json({ message: error.message });
    }

    private handleUntrustedError(error: Error | AppError, response?: Response): void {
        if (response) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }

        console.log('Application encountered an untrusted error.');
    }
}

export const errorHandler = new ErrorHandler();