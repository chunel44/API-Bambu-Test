import * as bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { myDataSource } from "@/config";
import { transporter } from "@/config/mailer.config";

import { isValidToken, signToken } from '@/utils/jwt.handle';
import { checkValidations } from '@/utils/validation';

import { AppError, HttpCode } from '@/exceptions/appError';

import { rolesUser, statusUser } from '@/entity/User.entity';
import { User } from "@/entity/User.entity";

export class AuthService {

    static async loginUser(email: string, password: string) {
        const userRepository = myDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email });

        if (!user) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Error try to login',
            });
        }

        if (!bcrypt.compareSync(password, user.password!)) {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Password incorrect',
            });
        }

        if (user.status !== 'active') {
            throw new AppError({
                httpCode: HttpCode.UNAUTHORIZED,
                description: 'Pending Account. Please Verify Your Email!',
            });
        }

        const token = signToken(user.id, email);
        delete user.confirmationCode;
        delete user.password;

        return {
            token,
            user
        }
    }

    static async registerUser(firstName: string, lastName: string, password: string, email: string, role: string) {
        const userRepository = myDataSource.getRepository(User);

        const existUser = await userRepository.findOneBy({ email });

        if (existUser) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'This user already exists'
            })
        }

        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;
        user.email = email;
        if (role === 'admin') user.role = rolesUser.ADMIN;

        user.confirmationCode = crypto.randomBytes(32).toString("hex");

        await checkValidations(user);


        user.hashPassword();
        const userRes = userRepository.create(user);
        return await myDataSource.getRepository(User).save(userRes);



    }

    static async sendEmail(toEmail: string, confirmationCode: string, url: string) {
        try {
            await transporter.sendMail({
                from: '"Verify your account 👻" <estrada.2468@gmail.com>', // sender address
                to: toEmail, // list of receivers
                subject: "Active your account",
                html: `
                    <b>Verify your account on the following link: </b>
                    <a href="${url}/auth/verify/${confirmationCode}">${url}/auth/verify/${confirmationCode}</a>
                `
            });
            return 'Please verify your email for activate your account'
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Error sending to Email'
            })
        }
    }

    static async checkJWT(token: string,) {
        const userRepository = myDataSource.getRepository(User);
        let userId = '';
        try {
            userId = await isValidToken(token);

        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Token not valid'
            });
        }
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'User not exists'
            });
        }
        const { id, email } = user;
        delete user.confirmationCode;
        return {
            token: signToken(id, email),
            user
        }
    }

    static async verifyUser(confirmationCode: string) {
        const userRepository = myDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ confirmationCode });

        if (!user) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'User not exists'
            });
        }
        if (user.status === 'active') {
            return {
                message: "Verified account "
            }
        }
        user.status = statusUser.ACTIVE;

        try {
            const newUser = await userRepository.save(user);
            delete newUser.confirmationCode;
            return {
                user: newUser
            }

        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Failed to verify user'
            });
        }
    }
}