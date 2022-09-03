import bcrypt from 'bcryptjs';
import { Request, Response } from "express";

import { myDataSource } from "@/config";

import { signToken } from "@/utils/jwt.handle";

import { statusUser } from '@/entity/interfaces';
import { User } from "@/entity/User.entity";
import { AuthService } from "@/services";



export class AuthController {

    static loginUser = async (req: Request, res: Response) => {
        const { email = '', password = '' } = req.body;

        const userRepository = myDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email });

        if (!user) {
            return res.status(400).json({ message: 'Email invalid' })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Password incorrect' })
        }

        if (user.status !== 'active') {
            return res.status(401).send({
                message: "Pending Account. Please Verify Your Email!",
            });
        }

        const token = signToken(user.id, email);

        return res.json({
            token,
            user
        })

    }

    static registerUser = async (req: Request, res: Response) => {
        const { email, firstName, lastName, password } = req.body;
        try {
            const user = await AuthService.registerUser(firstName, lastName, password, email);
            if (user instanceof User) {
                const { id } = user;
                const token = signToken(id, email);
                await AuthService.sendEmail(user.email, user.confirmationCode)
                res.status(200).json({
                    token,
                    user: {
                        email: user.email,
                        firstName: user.firstName,
                        lastname: user.lastName,
                        status: user.status.toString(),
                    }
                })
            } else {
                res.status(400).json(user);
            }
        } catch (error) {
            res.status(400).json({ message: 'Error creating the user' });
        }
    }

    static checkJWT = async (req: Request, res: Response) => {
        const jwtByUser = req.headers.authorization || "";
        const token = jwtByUser.split(" ").pop() as string;

        try {
            const checkJWT = await AuthService.checkJWT(token);
            return res.json(checkJWT);
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    static verifyUser = async (req: Request, res: Response) => {
        const { confirmationCode } = req.params;
        const userRepository = myDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ confirmationCode });

        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        user.status = statusUser.ACTIVE;
        user.confirmationCode = '';

        try {
            await userRepository.save(user);

            return res.json({
                user: {
                    email: user.email,
                    status: user.status
                }
            })

        } catch (error) {
            return res.status(500).json({ message: error });
        }

    }

}