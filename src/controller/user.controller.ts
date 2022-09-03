import { Request, Response } from "express";

type Data =
    | { message: string }
    | {
        user: {
            email: string;
            firstName: string;
            lastName: string;
        }
    }

export class UserController {

    static getUsers = async (req: Request, res: Response<Data>) => {
        res.json({ message: 'hola' })
    }

    static getUser = async (req: Request, res: Response<Data>) => {
        res.json({ message: 'hola' })
    }

    static updateUser = async (req: Request, res: Response<Data>) => {
        res.json({ message: 'hola' })
    }

    static deleteUser = async (req: Request, res: Response<Data>) => {
        res.json({ message: 'hola' })
    }

}