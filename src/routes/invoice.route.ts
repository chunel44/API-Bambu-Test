import { Router } from "express";

import { invoiceController } from "@/controller";
import { checkJWT } from "@/middlewares";


const router = Router();

// Generate a Invoice
router.post('/:idReservation', checkJWT, invoiceController.generateInvoice);



export { router };