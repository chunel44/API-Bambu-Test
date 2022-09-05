import { myDataSource } from "@/config";

import { checkValidations, strToDate } from "@/utils";

import { AppError, HttpCode } from "@/exceptions";

import { Airline } from "@/entity/Airline.entity";

import { Destination } from '../entity/Destination.entity';
import { Flight } from '../entity/Flight.entity';


export class FlightService {

    static async getFlights() {
        const flightRepository = myDataSource.getRepository(Flight);
        const flight = await flightRepository.find();
        return {
            flight
        };
    }

    static async addFlight(flight_number: string, departure_date: string, arrival_date: string, cost: number, idAirline: string, idDestination: string) {
        //departure_date, arrival_date, cost, idAirline, iddestination
        const flightRepository = myDataSource.getRepository(Flight);
        const airRepository = myDataSource.getRepository(Airline);
        const destinyRepository = myDataSource.getRepository(Destination);

        const existFlight = await flightRepository.findOneBy({ flight_number });
        if (existFlight) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Flight is already exists!'
            });
        }

        const airline = await airRepository.findOneBy({ id: idAirline });
        if (!airline) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Airline not exists!'
            });
        }

        const destiny = await destinyRepository.findOne({ where: { airline, id: idDestination } });
        if (!destiny) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Destiny not exists!'
            });
        }

        const arrival = strToDate(arrival_date);
        const departure = strToDate(departure_date);

        const flight = new Flight();
        flight.arrival_date = arrival;
        flight.departure_date = departure;
        flight.cost = cost;
        flight.flight_number = flight_number;
        flight.airline = airline;
        flight.destination = destiny;

        await checkValidations(airline);

        try {
            const saveFlight = await flightRepository.save(flight);
            return {
                message: 'Flight added successfully!',
                flight: {
                    saveFlight,
                    airline,
                    destiny
                }
            }
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Failed to save Flight!'
            })
        }
    }

    static async getFlightsByAirport(idAirport: string) {
        const flightRepository = myDataSource.getRepository(Flight);
        const airRepository = myDataSource.getRepository(Airline);

        const airline = await airRepository.findOne({ where: { id: idAirport } });
        if (!airline) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Airline not exists!'
            });
        }
        const flight = await flightRepository.find({ where: { airline }, relations: { airline: true, destination: true } });
        return {
            flight
        }
    }

    static async getFlight(id: string) {
        const flightRepository = myDataSource.getRepository(Flight);
        try {
            const flight = await flightRepository.findOneByOrFail({ id });
            return {
                flight
            }
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Not Flight found!'
            })
        }
    }

    static async deleteFlight(id: string) {
        const flightRepository = myDataSource.getRepository(Flight);
        try {
            await flightRepository.delete({ id });
            return { message: 'Flight deleted successfully' };
        } catch (error) {
            console.log(error);
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Error to delete Flight'
            })
        }
    }

}