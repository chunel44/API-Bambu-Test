
/* eslint-disable @typescript-eslint/ban-types */
import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

import { User } from '@/entity/User.entity';

import { myDataSource } from '../config/db.config';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: any, _args: ValidationArguments) {
        const userRepository = myDataSource.getRepository(User);
        return userRepository.findOneBy({ email }).then(email => {
            if (email) return false;
            return true;
        });
    }

}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}