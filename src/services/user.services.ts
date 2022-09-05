
import { myDataSource } from "@/config";

import { checkValidations } from "@/utils/validation";

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
        const user = await userRepository.findOne({ where: { id }, relations: { card: true } });
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
        await checkValidations(values);

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