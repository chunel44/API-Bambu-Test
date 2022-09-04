import { validate } from "class-validator";

import { myDataSource } from "@/config";

import { User } from "@/entity/User.entity";

import { AppError, HttpCode } from '../exceptions/appError';


export class UserService {

    static async getUsers() {
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.find({});
        if (!user) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Not Users Found'
            })
        }
        user.map((user) => {
            delete user.password;
            delete user.confirmationCode;
            return user;
        })
        return {
            user
        }
    }

    static async getUser(id: string) {
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Not User Found'
            })
        }
        delete user.password;
        delete user.confirmationCode;
        return {
            user
        }
    }

    static async updateUser(id: string, values: User) {
        const userRepository = myDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id });
        if (!user) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Not User Found'
            })
        }

        // Validate
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(values, validationOpt);
        if (errors.length > 0) {
            throw new AppError({
                httpCode: HttpCode.UNPROCESSABLE_ENTITY,
                validation: errors,
                description: 'Validation Error'
            });
        }

        const updateUser = await userRepository.save({ ...user, ...values });
        if (!updateUser) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Error to update User'
            })
        }
        delete updateUser.password;
        delete updateUser.confirmationCode;
        return updateUser;
    }

    static async deleteUser(id: string) {
        const userRepository = myDataSource.getRepository(User);
        try {
            await userRepository.delete(id);
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Error to delete user'
            })
        }
    }

}