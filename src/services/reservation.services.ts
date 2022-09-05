import { myDataSource } from "@/config";

import { AppError, HttpCode } from "@/exceptions";

import { Flight } from "@/entity/Flight.entity";
import { Reservation } from "@/entity/Reservation.entity";
import { User } from "@/entity/User.entity";


export class ReservationService {

    static async createReservation(idUser: string, idFlight: string) {
        const reservationRepository = myDataSource.getRepository(Reservation);
        const flightRepository = myDataSource.getRepository(Flight);
        const userRepository = myDataSource.getRepository(User);

        const existUser = await userRepository.findOneBy({ id: idUser });
        if (!existUser) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'User not exists!'
            });
        }

        const existFlight = await flightRepository.findOneBy({ id: idFlight });

        if (!existFlight) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Flight not exists!'
            });
        }

        const reservation = new Reservation();
        reservation.user = existUser;
        reservation.flight = existFlight;

        try {
            const newReservation = await reservationRepository.save(reservation);
            delete newReservation.user.password;
            delete newReservation.user.confirmationCode;
            delete newReservation.user.role;
            delete newReservation.user.status;
            return {
                message: 'Reservation created successfully!',
                reservation: newReservation
            }
        } catch (error) {
            console.log({ error })
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Failed to create a Reservation!'
            })
        }
    }

    static async getReservations(idUser: string) {
        const reservationRepository = myDataSource.getRepository(Reservation);

        const reservation = await reservationRepository.find({ where: { user: { id: idUser } }, relations: { user: true, flight: true } })
        reservation.map((res) => {
            delete res.user.password;
            delete res.user.confirmationCode;
            delete res.user.role;
            delete res.user.status;
            return reservation;
        })

        return {
            reservation
        }
    }
}