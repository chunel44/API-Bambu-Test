import { NextFunction, Request, Response } from "express";

import { signToken } from "@/utils/jwt.handle";

import { AuthService } from "@/services";


export class AuthController {

    static loginUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email = '', password = '' } = req.body;
        try {
            const login = await AuthService.loginUser(email, password);
            return res.json(login);
        } catch (error) {
            next(error);
        }

    }

    static registerUser = async (req: Request, res: Response, next: NextFunction) => {
        const { email, firstName, lastName, password, role = '' } = req.body;
        try {
            const user = await AuthService.registerUser(firstName, lastName, password, email, role);
            const { id } = user;
            const token = signToken(id, email);
            const url = `${req.protocol}://${req.get('host')}`;
            const mail = await AuthService.sendEmail(user.email, user.confirmationCode!, url)
            res.status(200).json({
                token,
                user: {
                    email: user.email,
                    firstName: user.firstName,
                    lastname: user.lastName,
                    status: user.status!.toString(),
                },
                message: mail
            })
        } catch (error) {
            next(error);
        }
    }

    static checkJWT = async (req: Request, res: Response, next: NextFunction) => {
        const jwtByUser = req.headers.authorization || "";
        const token = jwtByUser.split(" ").pop() as string;

        try {
            const checkJWT = await AuthService.checkJWT(token);
            return res.json(checkJWT);
        } catch (error) {
            next(error);
        }
    }

    static verifyUser = async (req: Request, res: Response, next: NextFunction) => {
        const { confirmationCode } = req.params;
        try {
            const userVerify = await AuthService.verifyUser(confirmationCode);
            return res.json(
                userVerify
            )

        } catch (error) {
            next(error);
        }

    }

}