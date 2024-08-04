// errorHandlerMiddleware.ts
import { Container } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './errorHandler';

export function ErrorHandlerMiddleware(container: Container) {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        // console.log('Error handler reached:', err);

        if (res.headersSent) {
            console.log('Headers already sent. Passing to default Express error handler.');
            return next(err);
        }

        let statusCode = 500;
        let message = 'Internal Server Error';
        let status = false;

        if (err instanceof ErrorHandler) {
            console.log("Error is an instance of ErrorHandler");
            statusCode = err.statusCode;
            message = err.message;
            status = err.status;
        } else if (err.name === 'ValidationError') {
            statusCode = 400;
            message = err.message;
        } else if (err.code === 401) {
            statusCode = 401;
            message = err.message || 'Unauthorized';
        } else {
            statusCode = 500;
            message = 'Internal Server Error';
        }

        // console.log(`Responding with status ${statusCode}: ${message}`);

        res.status(statusCode).json({
            statusCode,
            message,
            status
        });
    };
}
