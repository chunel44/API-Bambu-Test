import { NextFunction, Request, Response } from 'express';

import { ReservationService } from '@/services';

export class ReservationController {

    static async createReservation(req: Request, res: Response, next: NextFunction) {
        try {
            const { idFlight } = req.body;
            const idUser = req.userId;
            const reservation = await ReservationService.createReservation(idUser!, idFlight);
            return res.status(201).json(reservation);
        } catch (error) {
            next(error);
        }
    }

    static async getReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const idUser = req.userId;
            const reservation = await ReservationService.getReservations(idUser!);
            return res.status(201).json(reservation);
        } catch (error) {
            next(error);
        }
    }

}