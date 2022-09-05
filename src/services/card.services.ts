import { myDataSource } from "@/config";

import { checkValidations } from "@/utils/validation";

import { AppError, HttpCode } from "@/exceptions";

import { Card } from "@/entity/Card.entity";
import { User } from "@/entity/User.entity";



export class CardService {

    static async addCreditCard(idUser: string, numberCard: string) {
        const cardRepository = myDataSource.getRepository(Card);
        const userRepository = myDataSource.getRepository(User);

        const existCard = await cardRepository.findOneBy({ numberCard });
        if (existCard) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Credit Card is already exists!'
            });
        }

        const user = await userRepository.findOneBy({ id: idUser }) as User;

        const card = new Card();
        card.numberCard = numberCard;
        card.user = user;
        card.setTypeCreditCard();

        await checkValidations(card);

        try {
            const saveCard = await cardRepository.save(card);
            delete saveCard.user;
            return {
                message: 'Credit Card added successfully!',
                card: saveCard
            }
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Failed to save credit card!'
            })
        }
    }

}