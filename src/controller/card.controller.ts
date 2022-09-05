import { NextFunction, Request, Response } from "express";

import { CardService } from "@/services";


export class CardController {


    static async addCreditCard(req: Request, res: Response, next: NextFunction) {
        try {
            const { numberCard } = req.body;
            const userId = req.userId;
            const addCard = await CardService.addCreditCard(userId!, numberCard);
            return res.status(201).json(addCard);
        } catch (error) {
            next(error);
        }
    }

}