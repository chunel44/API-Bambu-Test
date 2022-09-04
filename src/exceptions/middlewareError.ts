import { NextFunction, Request, Response } from "express";

import { errorHandler } from "./errorHandler";

const errorHandeler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    errorHandler.handleError(err, res);
}

const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error encountered:', err.message || err);

    next(err);
}

export { errorHandeler, errorLogger };