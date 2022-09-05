import { NextFunction, Request, Response } from "express";

import { myDataSource } from "@/config";

import { AppError, HttpCode } from "@/exceptions";

import { rolesUser, User } from "@/entity/User.entity";


export const checkIfIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    const userRepository = myDataSource.getRepository(User);
    let user: User;

    try {
        user = await userRepository.findOneOrFail({ where: { id: userId } });
    } catch (e) {
        throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: 'Not Authorized'
        });
    }

    //Check
    const { role } = user;
    if (role === rolesUser.ADMIN) {
        next();
    } else {
        throw new AppError({
            httpCode: HttpCode.UNAUTHORIZED,
            description: 'Not Authorized'
        });
    }
};