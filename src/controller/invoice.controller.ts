import { NextFunction, Request, Response } from "express";

import { invoiceService } from "@/services/invoice.services";


export class invoiceController {


    static async generateInvoice(req: Request, res: Response, next: NextFunction) {
        try {
            const { idReservation } = req.params;
            const invoice = await invoiceService.generateInvoice(idReservation);
            return res.status(201).json(invoice);
        } catch (error) {
            next(error);
        }
    }

}