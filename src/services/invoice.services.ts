import crypto from 'crypto';

import { myDataSource } from "@/config";

import { AppError, HttpCode } from "@/exceptions";

import { Invoice } from "@/entity/Invoice.entity";

import { Reservation } from '../entity/Reservation.entity';

export class invoiceService {


    static async generateInvoice(idReservation: string) {
        const invoiceRepository = myDataSource.getRepository(Invoice);
        const reservationRepository = myDataSource.getRepository(Reservation);

        const existReservation = await reservationRepository.findOneBy({ id: idReservation });

        if (!existReservation) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Reservation not exist!'
            })
        }
        const invoice = new Invoice();
        invoice.invoice = crypto.randomBytes(32).toString("hex");
        invoice.reservation = existReservation;

        try {
            const newInvoice = await invoiceRepository.save(invoice);

            return {
                invoice: {
                    invoiceId: newInvoice.invoice,
                    amountToPay: newInvoice.reservation.flight.cost,
                    createdDate: newInvoice.created_at,
                }
            }
        } catch (error) {
            throw new AppError({
                httpCode: HttpCode.BAD_REQUEST,
                description: 'Failed to generate Invoice!'
            })
        }


    }

}