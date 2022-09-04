import { NextFunction, Request, Response } from 'express';

import { isValidToken } from '@/utils/jwt.handle';

import { AppError, HttpCode } from '@/exceptions';



export const checkJWT = async (req: Request, res: Response, next: NextFunction) => {
    const jwtByUser = req.headers.authorization || "";
    const token = jwtByUser.split(" ").pop() as string;
    if (token === null) return res.sendStatus(401);
    try {
        const userId = await isValidToken(token);
        if (!userId) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Token not valid'
            })
        }
        req.userId = userId;
        next();
    } catch (error) {
        const err = error as string;
        throw new AppError({
            httpCode: HttpCode.BAD_REQUEST,
            description: err
        })
    }
}