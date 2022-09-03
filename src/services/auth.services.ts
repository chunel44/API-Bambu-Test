import { validate } from "class-validator";
import crypto from 'crypto';

import { myDataSource } from "@/config";
import { transporter } from "@/config/mailer.config";

import { isValidToken, signToken } from '@/utils/jwt.handle';

import { User } from "@/entity/User.entity";

export class AuthService {


    static async registerUser(firstName: string, lastName: string, password: string, email: string) {
        const userRepository = myDataSource.getRepository(User);

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        user.email = email;
        user.confirmationCode = crypto.randomBytes(32).toString("hex");


        // Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return errors
        }

        user.hashPassword();
        const userRes = userRepository.create(user);
        return await myDataSource.getRepository(User).save(userRes);

    }

    static async sendEmail(toEmail: string, confirmationCode: string) {
        try {
            await transporter.sendMail({
                from: '"Verify your account 👻" <estrada.2468@gmail.com>', // sender address
                to: toEmail, // list of receivers
                subject: "Active your account",
                html: `
                    <b>Verify your account on the following link: </b>
                    <a href="http://localhost:3000/auth/verify/${confirmationCode}">http://localhost:3000/auth/verify/${confirmationCode}</a>
                `
            });
            return 'Please verify your email for activate your account'
        } catch (error) {
            return 'Error sending to Email'
        }
    }

    static async checkJWT(token: string,) {
        const userRepository = myDataSource.getRepository(User);
        let userId = '';
        try {
            userId = await isValidToken(token);

        } catch (error) {
            return {
                message: 'Token not valid'
            }
        }
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            return {
                message: 'User not exists'
            }
        }
        const { id, email } = user;
        return {
            token: signToken(id, email),
            user: {
                email
            }
        }
    }
}