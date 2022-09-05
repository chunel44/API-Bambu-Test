import { validate } from "class-validator";

import { AppError, HttpCode } from "@/exceptions";


export const checkValidations = async (model: object) => {
    const validationOpt = { validationError: { target: false, value: false } };
    const errors = await validate(model, validationOpt);
    if (errors.length > 0) {
        throw new AppError({
            httpCode: HttpCode.UNPROCESSABLE_ENTITY,
            validation: errors,
            description: 'Validation Error'
        });
    }
}
