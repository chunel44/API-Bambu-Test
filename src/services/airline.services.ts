import { myDataSource } from '@/config';

import { slugToText } from '@/utils';
import { checkValidations } from '@/utils/validation';

import { AppError, HttpCode } from '@/exceptions';

import { Airline } from '@/entity/Airline.entity';

import { Destination } from '../entity/Destination.entity';


export class AirlineService {
    static async addAirport({ name }: Airline) {
        const airRepository = myDataSource.getRepository(Airline);

        const existAirline = await airRepository.findOneBy({ name })
        if (existAirline) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Airline is already exists!'
            });
        }
        const airline = new Airline();
        airline.name = name.toLowerCase();

        await checkValidations(airline);

        try {
            const air = await airRepository.save(airline);
            return {
                message: 'Airline added successfully!',
                airline: air
            }
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Failed to save Airline!'
            })
        }
    }

    static async getAirportByName(name: string) {
        const airRepository = myDataSource.getRepository(Airline);

        try {
            const nameAir = slugToText(name);
            const airline = await airRepository.findOne({ where: { name: nameAir }, relations: { destinations: true } });
            return {
                airline
            }
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Airport not exists!'
            })
        }
    }


    static async getAll() {
        const airRepository = myDataSource.getRepository(Airline);
        const airline = await airRepository.find();

        return {
            airline
        }
    }

    static async deleteAirport(name: string) {
        const airRepository = myDataSource.getRepository(Airline);

        const nameAir = slugToText(name);
        try {
            await airRepository.delete({ name: nameAir });
            return { message: 'Airport deleted successfully' };
        } catch (error) {
            console.log(error);
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Error to delete Airport'
            })
        }
    }


    static async addDestiny(name: string, from: string, to: string) {
        const destinyRepository = myDataSource.getRepository(Destination);

        const { airline } = await this.getAirportByName(name);
        if (!airline) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Airport not exists!'
            })
        }
        const destiny = new Destination();
        destiny.airline = airline;
        destiny.from_location = from;
        destiny.from_location = to;
        await checkValidations(destiny);

        try {
            const newDestiny = await destinyRepository.save(destiny);
            return {
                message: 'Destination added successfully!',
                destiny: newDestiny
            }
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Failed to save Destination!'
            })
        }
    }
}