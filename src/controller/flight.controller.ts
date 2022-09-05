import { NextFunction, Request, Response } from "express";

import { FlightService } from "@/services";

export class FlightController {

    static async getFlights(req: Request, res: Response, next: NextFunction) {
        try {

            const addCard = await FlightService.getFlights();
            return res.status(200).json(addCard);
        } catch (error) {
            next(error);
        }
    }

    static async addFlight(req: Request, res: Response, next: NextFunction) {
        //22/12/2022 20:55:35 req.body example
        try {
            const { flight_number, departure_date, arrival_date, cost, idAirline, idDestination } = req.body;
            const addCard = await FlightService.addFlight(flight_number, departure_date, arrival_date, cost, idAirline, idDestination);
            return res.status(201).json(addCard);
        } catch (error) {
            next(error);
        }
    }

    //params: idAirport
    static async getFlightsByAirport(req: Request, res: Response, next: NextFunction) {
        try {
            const { idAirport } = req.params;
            const flights = await FlightService.getFlightsByAirport(idAirport);
            return res.status(200).json(flights);
        } catch (error) {
            next(error);
        }
    }

    //params: idFlight
    static async getFlight(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const flight = await FlightService.getFlight(id);
            return res.status(200).json(flight);
        } catch (error) {
            next(error);
        }
    }

    //params: idFlight
    static async deleteFlight(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const flight = await FlightService.deleteFlight(id);
            return res.status(200).json(flight);
        } catch (error) {
            next(error);
        }
    }
}