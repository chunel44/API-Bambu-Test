import { NextFunction, Request, Response } from "express";

import { UserService } from "@/services";

import { User } from '../entity/User.entity';




export class UserController {

    static getUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await UserService.getUsers()
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    static getUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const user = await UserService.getUser(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    static updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const updateValues: User = req.body;
        const { id } = req.params;
        try {
            const user = await UserService.updateUser(id, updateValues);
            return res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        try {
            const user = await UserService.deleteUser(id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

}