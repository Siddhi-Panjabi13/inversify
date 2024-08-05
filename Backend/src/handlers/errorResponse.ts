import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from './errorHandler'; // Adjust this import as needed

export function ErrorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    
    if (res.headersSent) {
        return next(err);
    }


    let statusCode = 500;
    let message = 'Internal Server Error';
    let status = false;
    
    if (err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({
            statusCode:err.statusCode,
            message:err.message,
            status:err.status
        });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({
            statusCode:err.statusCode,
            message:err.message,
            status:err.status
        });
    } else if (err.code === 401) {
        return res.status(401).json({
            statusCode:err.statusCode,
            message:err.message||'Unauthorized',
            status:err.status
        });}

     else {
        return res.status(500).json({
            statusCode:err.statusCode,
            message:err.message||'Internal Server Error',
            status:err.status
        });
    }
}



// // errorHandlerMiddleware.ts
// import { Container,injectable } from 'inversify';
// import { Request, Response, NextFunction } from 'express';
// import { ErrorHandler } from './errorHandler';

// @injectable()
// export class ErrorHandlerClass {

//     public errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
       

        
//         let statusCode = 500;
//         let message = 'Internal Server Error';
//         let status = false;
        
//         if (err instanceof ErrorHandler) {
//             return res.status(err.statusCode).json({
//                 statusCode:err.statusCode,
//                 message:err.message,
//                 status:err.status
//             });
//         } else if (err.name === 'ValidationError') {
//             return res.status(400).json({
//                 statusCode:err.statusCode,
//                 message:err.message,
//                 status:err.status
//             });
//         } else if (err.code === 401) {
//             return res.status(401).json({
//                 statusCode:err.statusCode,
//                 message:err.message||'Unauthorized',
//                 status:err.status
//             });}

//             else if (res.headersSent) {
//                 console.log('Headers already sent. Passing to default Express error handler.');
//                 return next(err);
//             }
//          else {
//             return res.status(500).json({
//                 statusCode:err.statusCode,
//                 message:err.message||'Internal Server Error',
//                 status:err.status
//             });
//         }
        
       

        
//     }
// }
