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
    static async getInvoices(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const invoice = await invoiceService.getInvoices(id);
            return res.status(200).json(invoice);
        } catch (error) {
            next(error);
        }
    }


}