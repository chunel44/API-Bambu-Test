import { Router } from "express";

import { FlightController } from "@/controller";
import { checkIfIsAdmin, checkJWT } from "@/middlewares";


const router = Router();

// create a flight
router.post('/', [checkJWT, checkIfIsAdmin], FlightController.addFlight);

// return all flights
router.get('/', [checkJWT, checkIfIsAdmin], FlightController.getFlights);

// return all flights by idAirport
router.get('/airline/:idAirport', [checkJWT, checkIfIsAdmin], FlightController.getFlightsByAirport);

// return a fligth by id
router.get('/:id', [checkJWT, checkIfIsAdmin], FlightController.getFlight);

// Delete a Flight
router.delete('/:id', [checkJWT, checkIfIsAdmin], FlightController.deleteFlight);

export { router };