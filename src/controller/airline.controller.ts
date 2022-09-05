import { NextFunction, Request, Response } from 'express';

import { Airline } from '@/entity/Airline.entity';
import { AirlineService } from '@/services/airline.services';

export class AirlineController {

    static async addAirport(req: Request, res: Response, next: NextFunction) {
        try {
            const airBody = req.body as Airline;
            const addCard = await AirlineService.addAirport(airBody);
            return res.status(201).json(addCard);
        } catch (error) {
            next(error);
        }
    }

    static async getAirportByName(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const airline = await AirlineService.getAirportByName(name);
            return res.json(airline);
        } catch (error) {
            next(error);
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const airline = await AirlineService.getAll();
            return res.json(airline);
        } catch (error) {
            next(error);
        }
    }

    static async deleteAirport(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const airline = await AirlineService.deleteAirport(name);
            return res.json(airline);
        } catch (error) {
            next(error);
        }
    }

    static async addDestiny(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.params;
            const { from, to } = req.body;
            const destiny = await AirlineService.addDestiny(name, from, to);
            return res.json(destiny);
        } catch (error) {
            next(error);
        }
    }

}