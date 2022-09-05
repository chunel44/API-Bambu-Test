import { Router } from "express";

import { AirlineController } from "@/controller";
import { checkIfIsAdmin, checkJWT } from "@/middlewares";


const router = Router();

router.post('/', [checkJWT, checkIfIsAdmin], AirlineController.addAirport);

router.get('/:name', [checkJWT, checkIfIsAdmin], AirlineController.getAirportByName);

router.get('/', [checkJWT, checkIfIsAdmin], AirlineController.getAll);

router.delete('/:name', [checkJWT, checkIfIsAdmin], AirlineController.deleteAirport);

router.post('/:name/destiny', [checkJWT, checkIfIsAdmin], AirlineController.addDestiny);

export { router };