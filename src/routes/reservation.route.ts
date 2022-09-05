import { Router } from "express";

import { ReservationController } from "@/controller";
import { checkJWT } from "@/middlewares";


const router = Router();

// create a reservation
router.post('/', checkJWT, ReservationController.createReservation);

//get Reservations of the user
router.get('/', checkJWT, ReservationController.getReservations);



export { router };