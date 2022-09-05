import { Router } from "express";

import { CardController } from "@/controller";
import { checkJWT } from "@/middlewares";


const router = Router();

// create a credit Card
router.post('/', checkJWT, CardController.addCreditCard);


export { router };